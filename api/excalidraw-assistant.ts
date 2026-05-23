import { readFileSync } from "node:fs";
import { join } from "node:path";

import { smoothStream, streamText } from "ai";

export const maxDuration = 60;

export const ASSISTANT_MODEL = "anthropic/claude-sonnet-4.6";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

let cachedKnowledge: string | null = null;

export function getKnowledge(): string {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }

  const candidates = [
    join(process.cwd(), "api/knowledge/excalidraw-documentation.md"),
    join(process.cwd(), "../api/knowledge/excalidraw-documentation.md"),
  ];

  for (const path of candidates) {
    try {
      cachedKnowledge = readFileSync(path, "utf-8");
      return cachedKnowledge;
    } catch {
      // try next path
    }
  }

  throw new Error("Excalidraw documentation knowledge file not found");
}

function buildSystemPrompt(knowledge: string): string {
  return `You are the Excalidraw Assistant — a helpful expert on Excalidraw usage, keyboard shortcuts, best practices, styling, collaboration, exports, and troubleshooting.

Answer questions clearly and thoroughly using the reference documentation below. When listing shortcuts or steps, use markdown formatting (bullet lists, tables) when helpful. Prefer concrete, actionable guidance.

If a question is not covered in the reference, say so honestly and give general Excalidraw guidance only when you are confident. Do not invent keyboard shortcuts or features.

Reference documentation:
${knowledge}`;
}

export function validateMessages(body: unknown): ChatMessage[] | null {
  if (
    !body ||
    typeof body !== "object" ||
    !("messages" in body) ||
    !Array.isArray((body as { messages: unknown }).messages)
  ) {
    return null;
  }

  const { messages } = body as { messages: unknown[] };

  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }

  const validated: ChatMessage[] = [];

  for (const message of messages) {
    if (
      !message ||
      typeof message !== "object" ||
      !("role" in message) ||
      !("content" in message)
    ) {
      return null;
    }

    const { role, content } = message as { role: unknown; content: unknown };

    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string" ||
      content.length === 0 ||
      content.length > MAX_MESSAGE_LENGTH
    ) {
      return null;
    }

    validated.push({ role, content });
  }

  return validated;
}

export function formatSSE(payload: Record<string, unknown> | "[DONE]"): string {
  const data = payload === "[DONE]" ? "[DONE]" : JSON.stringify(payload);
  return `data: ${data}\n\n`;
}

export function hasAssistantGatewayAuth(): boolean {
  return Boolean(
    process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN,
  );
}

export async function streamAssistantResponse(
  messages: ChatMessage[],
  write: (chunk: string) => void,
): Promise<void> {
  if (!hasAssistantGatewayAuth()) {
    throw new Error(
      "Missing AI Gateway credentials. Add AI_GATEWAY_API_KEY to your environment.",
    );
  }

  const knowledge = getKnowledge();

  const result = streamText({
    model: ASSISTANT_MODEL,
    system: buildSystemPrompt(knowledge),
    messages,
    experimental_transform: smoothStream({
      chunking: "word",
      delayInMs: 12,
    }),
  });

  for await (const chunk of result.textStream) {
    if (chunk) {
      write(formatSSE({ type: "content", delta: chunk }));
    }
  }

  write(formatSSE({ type: "done", finishReason: "stop" }));
  write(formatSSE("[DONE]"));
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = validateMessages(body);

  if (!messages) {
    return Response.json({ error: "Invalid messages payload" }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (chunk: string) => {
        controller.enqueue(encoder.encode(chunk));
      };

      try {
        await streamAssistantResponse(messages, write);
        controller.close();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Assistant request failed";

        write(
          formatSSE({
            type: "error",
            error: { message, status: 500 },
          }),
        );
        write(formatSSE("[DONE]"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
