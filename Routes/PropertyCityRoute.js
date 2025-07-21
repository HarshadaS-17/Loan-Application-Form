// routes/propertyCityRoutes.js
import express from "express";
import {
  createCity,
  getAllCity,
  updateCity,
  deleteCity,
} from "../Controller/PropertyCityController.js";

const router = express.Router();

router.post("/add-property-city", createCity);
router.get("/get-property-city", getAllCity);
router.put("/update-property-city/:id", updateCity);
router.delete("/delete-property-city/:id", deleteCity);

export default router;
