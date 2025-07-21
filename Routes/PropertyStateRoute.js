import express from "express";
import {
  createPropertyState,
  getAllPropertyStates,
  updatePropertyState,
  togglePropertyState,
  deletePropertyState,
} from "../Controller/PropertyStateController.js";

const router = express.Router();

// POST - Create
router.post("/add-state", createPropertyState);

// GET - All States
router.get("/get-state", getAllPropertyStates);

// PUT - Update
router.put("/update-state/:id", updatePropertyState);

// PATCH - Toggle Status
router.patch("/toggle/:id", togglePropertyState);

// DELETE
router.delete("/delete-state/:id", deletePropertyState);

export default router;
