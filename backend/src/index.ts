import express from "express";
import type { Request, Response } from "express";
import { chat } from "./services/lmStudioService.ts";

const server = express();

const LLM = "qwen/qwen3-vl-8b";

const port = 3001;

server.use(express.json());

server.get("/", (_req, res) => {
  res.send("ok");
});

server.post("/api/chat", async (req: Request, res: Response) => {
  const { message } = req.body;

  const answer = await chat(LLM, [{ role: "user", content: message }]);

  res.status(200).json({ reply: answer });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
