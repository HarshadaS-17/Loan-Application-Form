import CaseStatus from '../Model/CaseStatusModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create CaseStatus
const createCaseStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newCaseStatus = new CaseStatus({ name });
    await newCaseStatus.save();

    res.status(201).json(
      new ApiResponse(201, newCaseStatus, "CaseStatus created successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error creating CaseStatus: ${err.message}`)
    );
  }
};

// Get All CaseStatuses
const getAllCaseStatuses = async (req, res) => {
  try {
    const caseStatuses = await CaseStatus.find();
    res.status(200).json(
      new ApiResponse(200, caseStatuses, "CaseStatuses fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching CaseStatuses: ${err.message}`)
    );
  }
};

// Get CaseStatus by ID
const getCaseStatusById = async (req, res) => {
  try {
    const caseStatus = await CaseStatus.findById(req.params.id);
    if (!caseStatus) {
      return res.status(404).json(
        new ApiResponse(404, null, "CaseStatus not found")
      );
    }
    res.status(200).json(
      new ApiResponse(200, caseStatus, "CaseStatus fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching CaseStatus: ${err.message}`)
    );
  }
};

// Update CaseStatus
const updateCaseStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCaseStatus = await CaseStatus.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedCaseStatus) {
      return res.status(404).json(
        new ApiResponse(404, null, "CaseStatus not found for update")
      );
    }

    res.status(200).json(
      new ApiResponse(200, updatedCaseStatus, "CaseStatus updated successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error updating CaseStatus: ${err.message}`)
    );
  }
};

// Delete CaseStatus
const deleteCaseStatus = async (req, res) => {
  try {
    const deletedCaseStatus = await CaseStatus.findByIdAndDelete(req.params.id);
    if (!deletedCaseStatus) {
      return res.status(404).json(
        new ApiResponse(404, null, "CaseStatus not found for deletion")
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, "CaseStatus deleted successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error deleting CaseStatus: ${err.message}`)
    );
  }
};

export {
  createCaseStatus,
  getAllCaseStatuses,
  getCaseStatusById,
  updateCaseStatus,
  deleteCaseStatus
};
