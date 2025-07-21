import Employment from '../Model/EmploymentModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create Employment
const createEmployment = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newEmployment = new Employment({ name, permissions });
    await newEmployment.save();

    res.status(201).json(
      new ApiResponse(201, { newEmployment }, "Employment type created successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error creating employment type: ${err.message}`)
    );
  }
};

// Get All Employments
const getAllEmployments = async (req, res) => {
  try {
    const employments = await Employment.find();
    res.status(200).json(
      new ApiResponse(200, employments, "Employment types fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching employment types: ${err.message}`)
    );
  }
};

// Get Employment by ID
const getEmploymentById = async (req, res) => {
  try {
    const employment = await Employment.findById(req.params.id);
    if (!employment) {
      return res.status(404).json(
        new ApiResponse(404, null, "Employment type not found")
      );
    }
    res.status(200).json(
      new ApiResponse(200, employment, "Employment type fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching employment type: ${err.message}`)
    );
  }
};

// Update Employment
const updateEmployment = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const updatedEmployment = await Employment.findByIdAndUpdate(
      req.params.id,
      { name, permissions },
      { new: true }
    );

    if (!updatedEmployment) {
      return res.status(404).json(
        new ApiResponse(404, null, "Employment type not found for update")
      );
    }

    res.status(200).json(
      new ApiResponse(200, updatedEmployment, "Employment type updated successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error updating employment type: ${err.message}`)
    );
  }
};

// Delete Employment
const deleteEmployment = async (req, res) => {
  try {
    const deletedEmployment = await Employment.findByIdAndDelete(req.params.id);
    if (!deletedEmployment) {
      return res.status(404).json(
        new ApiResponse(404, null, "Employment type not found for deletion")
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, "Employment type deleted successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error deleting employment type: ${err.message}`)
    );
  }
};

export {
  createEmployment,
  getAllEmployments,
  getEmploymentById,
  updateEmployment,
  deleteEmployment
};
