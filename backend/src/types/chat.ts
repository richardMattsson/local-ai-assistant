export type ChatMessage = { role: "user" | "assistans"; content: string };
export type ChatRequest = { message: ChatMessage };
export type ChatResponse = { message: ChatMessage };
export type LlmMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
