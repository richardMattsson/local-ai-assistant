type ChatMessage = { role: "user" | "assistans"; content: string };
type ChatRequest = { message: ChatMessage };
type ChatResponse = { message: ChatMessage };
type LlmMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
