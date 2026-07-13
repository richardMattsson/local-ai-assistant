import { Router } from "express";
import { confirmMessage, sendMessage } from "../controllers/chatController.ts";

const router = Router();

router.get("/", confirmMessage);
router.post("/chat", sendMessage);

export default router;
