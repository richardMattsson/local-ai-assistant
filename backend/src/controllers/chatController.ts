import type { Request, Response } from "express";
import { chatService } from "../services/ChatService.ts";

export const confirmMessage = (_req: Request, res: Response) => {
  res.status(200).json({ message: "ok" });
};

export const sendMessage = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const reply = await chatService(message);
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
