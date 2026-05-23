import type { ServerResponse } from "node:http";

import type { VercelResponse } from "@vercel/node";

type WritableResponse = ServerResponse | VercelResponse;

export function setStreamHeaders(res: WritableResponse) {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
}

export function writeStreamChunk(res: WritableResponse, chunk: string) {
  res.write(chunk);

  const flushable = res as ServerResponse & { flush?: () => void };
  flushable.flush?.();
}
