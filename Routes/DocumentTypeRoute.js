import express from "express";
import {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentType,
  deleteDocumentType,
} from "../Controller/DocumentTypeController.js";

const router = express.Router();

router.post("/add-document-type", createDocumentType);
router.get("/get-document-types", getAllDocumentTypes);
router.get("/:id", getDocumentTypeById);
router.put("/update-document-type/:id", updateDocumentType);
router.delete("/delete-document-type/:id", deleteDocumentType);

export default router;
