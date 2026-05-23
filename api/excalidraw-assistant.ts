import {
  formatSSE,
  streamAssistantResponse,
  validateMessages,
} from "./lib/assistant-core";
import { setStreamHeaders, writeStreamChunk } from "./lib/stream-utils";

import type { VercelRequest, VercelResponse } from "@vercel/node";

function setCorsHeaders(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const messages = validateMessages(req.body);

  if (!messages) {
    return res.status(400).json({ error: "Invalid messages payload" });
  }

  try {
    setStreamHeaders(res);

    await streamAssistantResponse(messages, (chunk) => {
      writeStreamChunk(res, chunk);
    });

    return res.status(200).end();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Assistant request failed";

    if (!res.headersSent) {
      return res.status(500).json({ error: message });
    }

    writeStreamChunk(
      res,
      formatSSE({
        type: "error",
        error: { message, status: 500 },
      }),
    );
    writeStreamChunk(res, formatSSE("[DONE]"));
    return res.status(200).end();
  }
}
