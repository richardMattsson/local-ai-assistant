import express, { Request, Response } from "express";

const server = express();

const port = 3001;

server.use(express.json());

server.get("/", (_req, res) => {
  res.send("ok");
});

server.post("/api/chat", (req: Request, res: Response) => {
  const { message } = req.body;
  console.log(message);

  res.status(200).json({ reply: "Hello from backend" });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
