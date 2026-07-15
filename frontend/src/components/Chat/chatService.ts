import type { ChatMessage } from "../../../../shared/types/chat";

export const sendMessage = async (
  messages: Omit<ChatMessage, "id">[],
  sendToken: (one: string) => void,
): Promise<void> => {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.body) {
    throw new Error("Response has no body");
  }
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const decodedChunk = decoder.decode(value);
    sendToken(decodedChunk);
  }
};
