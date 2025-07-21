import PropertyState from "../Model/PropertyStateModel.js";

// Create State
export const createPropertyState = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "State name is required" });
    }

    const existing = await PropertyState.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "State already exists" });
    }

    const newState = await PropertyState.create({ name: name.trim() });
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All States
export const getAllPropertyStates = async (req, res) => {
  try {
    const states = await PropertyState.find().sort({ name: 1 });
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch states", error: error.message });
  }
};

// Update State
export const updatePropertyState = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "State name is required" });
    }

    const updated = await PropertyState.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// Toggle State Status
export const togglePropertyState = async (req, res) => {
  try {
    const { id } = req.params;
    const state = await PropertyState.findById(id);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    state.active = !state.active;
    await state.save();

    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: "Toggle failed", error: error.message });
  }
};

// Delete State
export const deletePropertyState = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PropertyState.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "State not found" });
    }

    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};
