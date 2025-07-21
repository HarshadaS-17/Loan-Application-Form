import express from "express";
import {
  createBankName,
  getAllBankNames,
  getBankNameById,
  updateBankName,
  deleteBankName,
} from "../Controller/BankNameController.js";

const router = express.Router();

router.post("/add-bank-name", createBankName);
router.get("/get-bank-names", getAllBankNames);
router.get("/:id", getBankNameById);
router.put("/update-bank-name/:id", updateBankName);
router.delete("/delete-bank-name/:id", deleteBankName);

export default router;
