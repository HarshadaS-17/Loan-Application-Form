import express from "express";
import {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
} from "../Controller/WhatsappMasterController.js";

const router = express.Router();

// POST: Create new template
router.post("/add-template", createTemplate);

// GET: Get all templates
router.get("/get-templates", getAllTemplates);

// PUT: Update template by ID
router.put("/update-template/:id", updateTemplate);

// DELETE: Delete template by ID
router.delete("/delete-template/:id", deleteTemplate);

export default router;
