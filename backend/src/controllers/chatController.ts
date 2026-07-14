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

  try {
    const reply = await chatService(messages);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
