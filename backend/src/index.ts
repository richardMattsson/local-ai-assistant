import express, { type Express } from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.ts";

const app: Express = express();

const port = 3001;

app.use(express.json());

app.use(cors());

app.use("/api", chatRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
