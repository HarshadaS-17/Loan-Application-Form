import DocumentMaster from "../Model/DocumentModel.js";

// Create a new document master entry
export const createDocumentMaster = async (req, res) => {
  try {
    const newDoc = await DocumentMaster.create(req.body);
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(400).json({ message: "Failed to create", error });
  }
};

// Get all document master entries
export const getAllDocumentMasters = async (req, res) => {
  try {
    const docs = await DocumentMaster.find();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Get a single document master by ID
export const getDocumentMasterById = async (req, res) => {
  try {
    const doc = await DocumentMaster.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
};

// Update document master
export const updateDocumentMaster = async (req, res) => {
  try {
    const updated = await DocumentMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update", error });
  }
};

// Delete document master
export const deleteDocumentMaster = async (req, res) => {
  try {
    const deleted = await DocumentMaster.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
