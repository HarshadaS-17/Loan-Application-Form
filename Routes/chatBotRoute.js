import { Router } from "express";
import { chatBot, chatbotResponse } from "../Controller/chatBotController.js";

const router = Router()

router.route('/').post(chatbotResponse)
router.route('/ch').post(chatBot)

export default router