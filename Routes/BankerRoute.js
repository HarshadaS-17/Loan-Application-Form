import express from "express";
import {
  createBanker,
  getAllBankers,
  updateBanker,
  deleteBanker,
} from "../Controller/BankerController.js";

const router = express.Router();

// Banker routes for a specific bank
router.post("/add-banker/:bankId/bankers", createBanker);
router.get("/get-bankers/:bankId/bankers", getAllBankers);
router.put("/update-banker/:bankId/bankers/:bankerId", updateBanker);
router.delete("/delete-banker/:bankId/bankers/:bankerId", deleteBanker);

export default router;
