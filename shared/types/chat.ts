export type Role = "system" | "user" | "assistans";
export type ChatMessage = {
  id: string;
  role: Omit<Role, "system">;
  content: string;
};
export type ChatRequest = { message: LlmMessage[] };
export type ChatResponse = { reply: string };
export type LlmMessage = {
  role: Role;
  content: string;
};
