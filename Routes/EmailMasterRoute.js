import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../Controller/EmailMasterController.js";

const router = express.Router();

router.post("/add-template", createTemplate);
router.get("/get-templates", getAllTemplates);
router.get("/:id", getTemplateById);
router.put("/update-template/:id", updateTemplate);
router.delete("/delete-template/:id", deleteTemplate);

export default router;
