import express from "express";
import {
  createRemark,
  // editRemark,
  getRemarksByEnquiryId,
  getHistory,
  getRemarkById
} from "../Controller/remarkController.js";

const router = express.Router();

// POST: Add new remark
router.post("/add-remark/:id", createRemark);

// GET: Get all remarks for a specific enquiry
router.get("/:enquiryId", getRemarksByEnquiryId);

// router.route("/edit").put(editRemark)

router.route('/remark-history/:id').get(getHistory)

router.route("/get-remark/:id").get(getRemarkById)

export default router;
