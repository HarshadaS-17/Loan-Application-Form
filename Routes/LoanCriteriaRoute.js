import express from "express";
import {
  createCriteria,
  getCriteriaByType,
  updateCriteria,
  deleteCriteria,
  getLoanCriteriaWithBankAndProduct,
  getAllCriteria,
} from "../Controller/LoanCriteriaController.js";

const router = express.Router();

// GET all criteria
// router.get("/get-all-criteria", getAllCriteria);
router.route("/get-all-criteria").get(getAllCriteria);

// POST new criteria
router.post("/add-criteria", createCriteria);

// GET criteria by type
router.get("/get-criteria/:type", getCriteriaByType);

// PUT update criteria
router.put("/update-criteria/:id", updateCriteria);

// DELETE criteria
router.delete("/delete-criteria/:id", deleteCriteria);

// router.get("/get/:bankId/:productID ", getLoanCriteriaWithBankAndProduct);

router.route("/get/:bankId/:productId").get(getLoanCriteriaWithBankAndProduct);

export default router;
