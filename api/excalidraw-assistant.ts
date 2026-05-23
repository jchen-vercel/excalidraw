import {
  formatSSE,
  streamAssistantResponse,
  validateMessages,
} from "./lib/assistant-core";

export const maxDuration = 60;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

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
