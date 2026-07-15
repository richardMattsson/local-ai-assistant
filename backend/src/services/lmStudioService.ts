import type { LlmMessage } from "../../../shared/types/chat.ts";

export async function sendToLlm(
  model: string,
  messages: LlmMessage[],
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!response.body) {
    throw new Error("Response has no body");
  }

  return response.body;
}
