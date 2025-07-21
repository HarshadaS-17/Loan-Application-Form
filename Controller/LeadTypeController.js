import LeadType from '../Model/LeadTypeModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create Lead Type
const createLeadType = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newLeadType = new LeadType({ name, permissions });
    await newLeadType.save();

    res.status(201).json(
      new ApiResponse(201, { newLeadType }, "Lead type created successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error creating lead type: ${err.message}`)
    );
  }
};

// Get All Lead Types
const getAllLeadTypes = async (req, res) => {
  try {
    const leadTypes = await LeadType.find();
    res.status(200).json(
      new ApiResponse(200, leadTypes, "Lead types fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching lead types: ${err.message}`)
    );
  }
};

// Get Lead Type by ID
const getLeadTypeById = async (req, res) => {
  try {
    const leadType = await LeadType.findById(req.params.id);
    if (!leadType) {
      return res.status(404).json(
        new ApiResponse(404, null, "Lead type not found")
      );
    }
    res.status(200).json(
      new ApiResponse(200, leadType, "Lead type fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching lead type: ${err.message}`)
    );
  }
};

// Update Lead Type
const updateLeadType = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const updatedLeadType = await LeadType.findByIdAndUpdate(
      req.params.id,
      { name, permissions },
      { new: true }
    );

    if (!updatedLeadType) {
      return res.status(404).json(
        new ApiResponse(404, null, "Lead type not found for update")
      );
    }

    res.status(200).json(
      new ApiResponse(200, updatedLeadType, "Lead type updated successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error updating lead type: ${err.message}`)
    );
  }
};

// Delete Lead Type
const deleteLeadType = async (req, res) => {
  try {
    const deletedLeadType = await LeadType.findByIdAndDelete(req.params.id);
    if (!deletedLeadType) {
      return res.status(404).json(
        new ApiResponse(404, null, "Lead type not found for deletion")
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, "Lead type deleted successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error deleting lead type: ${err.message}`)
    );
  }
};

export {
  createLeadType,
  getAllLeadTypes,
  getLeadTypeById,
  updateLeadType,
  deleteLeadType
};
