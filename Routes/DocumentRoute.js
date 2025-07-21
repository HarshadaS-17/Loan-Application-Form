import express from "express";
import {
  createDocumentMaster,
  getAllDocumentMasters,
  getDocumentMasterById,
  updateDocumentMaster,
  deleteDocumentMaster,
} from "../Controller/DocumentController.js";

const router = express.Router();

router.post("/add-document", createDocumentMaster);
router.get("/get-documents", getAllDocumentMasters);
router.get("/:id", getDocumentMasterById);
router.put("/update-document/:id", updateDocumentMaster);
router.delete("/delete-document/:id", deleteDocumentMaster);

export default router;
