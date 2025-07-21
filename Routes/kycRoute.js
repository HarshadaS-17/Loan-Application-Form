import express from "express";
import { updateKYCStatus, verifyKYC } from "../Controller/kycController.js";

const router = express.Router();

router.route("/create-kyc").post(verifyKYC);
router.route("/update-kyc/:id").put(updateKYCStatus);

export default router;
