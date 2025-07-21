import { Router } from "express";
import { sendEmail } from "../Controller/emailController.js";

const router = Router();

router.route("/send-email").post(sendEmail);

export default router;

