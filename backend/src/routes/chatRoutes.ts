import { Router } from "express";
import {
  confirmConnection,
  sendMessage,
} from "../controllers/chatController.ts";

const router = Router();

router.get("/", confirmConnection);
router.post("/chat", sendMessage);

export default router;
