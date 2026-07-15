import type { Request, Response } from "express";
import { chatService } from "../services/ChatService.ts";

export const confirmConnection = (_req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
};

export const sendMessage = async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({
      error: "Message is required",
    });
  }
  const decoder = new TextDecoder();

  try {
    const reply = await chatService(messages);

    const reader = reply.getReader();
    res.status(200);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      const object = JSON.parse(decodedChunk.split("data: ")[1]);

      if (object.choices[0].delta.content) {
        const token = object.choices[0].delta.content;
        res.write(token);
      }
    }
    res.end();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
