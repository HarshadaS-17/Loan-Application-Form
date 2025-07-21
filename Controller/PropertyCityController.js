// controllers/propertyCityController.js
import PropertyCity from "../Model/PropertyCityModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// Create City
export const createCity = async (req, res) => {
  try {
    const { name, active } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "City name is required" });
    }

    const existing = await PropertyCity.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ message: "City already exists" });
    }

    const city = new PropertyCity({ name: name.trim(), active });
    await city.save();

    res.status(201).json({ message: "City created successfully", data: city });
  } catch (error) {
    console.error("Create City Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Cities
export const getAllCity = async (req, res) => {
  try {
    const cities = await PropertyCity.find().sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, cities, "Cities data"));
  } catch (error) {
    console.error("Fetch Cities Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Update City
export const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, active } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "City name is required" });
    }

    const updated = await PropertyCity.findByIdAndUpdate(
      id,
      { name: name.trim(), active },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City updated", data: updated });
  } catch (error) {
    console.error("Update City Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete City
export const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PropertyCity.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Delete City Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};