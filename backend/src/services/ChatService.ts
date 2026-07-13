import { LLM } from "../config/llm.ts";
import { sendToLlm } from "./lmStudioService.ts";

export const chatService = (message: string) => {
  return sendToLlm(LLM, [{ role: "user", content: message }]);
};
