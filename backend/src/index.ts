import express, { type Express } from "express";
import chatRoutes from "./routes/chatRoutes.ts";

const app: Express = express();

const port = 3001;

app.use(express.json());

app.use("/api", chatRoutes);

app.get("/", (_req, res) => {
  res.send("ok");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
