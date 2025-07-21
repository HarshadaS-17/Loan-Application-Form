import LeadStage from '../Model/LeadStageModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create LeadStage
const createLeadStage = async (req, res) => {
  try {
    const { name } = req.body;
    const newLeadStage = new LeadStage({ name });
    await newLeadStage.save();

    res.status(201).json(
      new ApiResponse(201, newLeadStage, "LeadStage created successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error creating LeadStage: ${err.message}`)
    );
  }
};

// Get All LeadStages
const getAllLeadStages = async (req, res) => {
  try {
    const leadStages = await LeadStage.find();
    res.status(200).json(
      new ApiResponse(200, leadStages, "LeadStages fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching LeadStages: ${err.message}`)
    );
  }
};

// Get LeadStage by ID
const getLeadStageById = async (req, res) => {
  try {
    const leadStage = await LeadStage.findById(req.params.id);
    if (!leadStage) {
      return res.status(404).json(
        new ApiResponse(404, null, "LeadStage not found")
      );
    }
    res.status(200).json(
      new ApiResponse(200, leadStage, "LeadStage fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching LeadStage: ${err.message}`)
    );
  }
};

// Update LeadStage
const updateLeadStage = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedLeadStage = await LeadStage.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedLeadStage) {
      return res.status(404).json(
        new ApiResponse(404, null, "LeadStage not found for update")
      );
    }

    res.status(200).json(
      new ApiResponse(200, updatedLeadStage, "LeadStage updated successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error updating LeadStage: ${err.message}`)
    );
  }
};

// Delete LeadStage
const deleteLeadStage = async (req, res) => {
  try {
    const deletedLeadStage = await LeadStage.findByIdAndDelete(req.params.id);
    if (!deletedLeadStage) {
      return res.status(404).json(
        new ApiResponse(404, null, "LeadStage not found for deletion")
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, "LeadStage deleted successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error deleting LeadStage: ${err.message}`)
    );
  }
};

export {
  createLeadStage,
  getAllLeadStages,
  getLeadStageById,
  updateLeadStage,
  deleteLeadStage
};
