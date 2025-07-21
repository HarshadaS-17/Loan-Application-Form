import { Router } from "express";
import { checkCibilScore } from "../Controller/cibilScoreCheckController.js";


const router = Router()

router.route('/cibil').post(checkCibilScore);

export default router;