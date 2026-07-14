import { LLM } from "../config/llm.ts";
import type { LlmMessage } from "../../../shared/types/chat.ts";
import { sendToLlm } from "./lmStudioService.ts";

export const chatService = (messages: LlmMessage[]) => {
  return sendToLlm(LLM, messages);
};
