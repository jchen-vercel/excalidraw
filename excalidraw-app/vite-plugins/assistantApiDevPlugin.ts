import type { IncomingMessage, ServerResponse } from "node:http";

import { loadEnv, type Plugin } from "vite";

const ASSISTANT_API_PATH = "/api/excalidraw-assistant";

const readJsonBody = (req: IncomingMessage): Promise<unknown> =>
  new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });

const setCorsHeaders = (res: ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
};

const setStreamHeaders = (res: ServerResponse) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
};

const writeStreamChunk = (res: ServerResponse, chunk: string) => {
  res.write(chunk);

  const flushable = res as ServerResponse & { flush?: () => void };
  flushable.flush?.();
};

export function assistantApiDevPlugin(): Plugin {
  let assistantCorePromise: Promise<{
    formatSSE: (payload: Record<string, unknown> | "[DONE]") => string;
    hasAssistantGatewayAuth: () => boolean;
    streamAssistantResponse: (
      messages: { role: "user" | "assistant"; content: string }[],
      write: (chunk: string) => void,
    ) => Promise<void>;
    validateMessages: (
      body: unknown,
    ) => { role: "user" | "assistant"; content: string }[] | null;
  }> | null = null;

  const loadAssistantCore = () => {
    if (!assistantCorePromise) {
      assistantCorePromise = import("../../api/excalidraw-assistant");
    }
    return assistantCorePromise;
  };

  return {
    name: "excalidraw-assistant-api-dev",
    apply: "serve",
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, "");

      if (env.AI_GATEWAY_API_KEY) {
        process.env.AI_GATEWAY_API_KEY = env.AI_GATEWAY_API_KEY;
      }

      if (env.VERCEL_OIDC_TOKEN) {
        process.env.VERCEL_OIDC_TOKEN = env.VERCEL_OIDC_TOKEN;
      }

      const hasAuth = Boolean(
        process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN,
      );

      if (hasAuth) {
        console.info(
          "[excalidraw-assistant] Local API ready at /api/excalidraw-assistant",
        );
      } else {
        console.warn(
          "[excalidraw-assistant] Add AI_GATEWAY_API_KEY to .env.local (repo root) to enable the assistant API in dev.",
        );
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];

        if (url !== ASSISTANT_API_PATH) {
          next();
          return;
        }

        setCorsHeaders(res);

        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        try {
          const {
            formatSSE,
            hasAssistantGatewayAuth,
            streamAssistantResponse,
            validateMessages,
          } = await loadAssistantCore();

          if (!hasAssistantGatewayAuth()) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error:
                  "Missing AI Gateway credentials. Add AI_GATEWAY_API_KEY to .env.local at the repo root.",
              }),
            );
            return;
          }

          const body = await readJsonBody(req);
          const messages = validateMessages(body);

          if (!messages) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Invalid messages payload" }));
            return;
          }

          res.statusCode = 200;
          setStreamHeaders(res);

          await streamAssistantResponse(messages, (chunk: string) => {
            writeStreamChunk(res, chunk);
          });

          res.end();
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Assistant request failed";

          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: message }));
            return;
          }

          const { formatSSE } = await loadAssistantCore();

          writeStreamChunk(
            res,
            formatSSE({
              type: "error",
              error: { message, status: 500 },
            }),
          );
          writeStreamChunk(res, formatSSE("[DONE]"));
          res.end();
        }
      });
    },
  };
}
