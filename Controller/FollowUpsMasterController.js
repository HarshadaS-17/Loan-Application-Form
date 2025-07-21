import FollowUp from '../Model/FollowUpsMasterModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create FollowUp
const createFollowUp = async (req, res) => {
  try {
    const { name } = req.body;
    const newFollowUp = new FollowUp({ name });
    await newFollowUp.save();

    res.status(201).json(
      new ApiResponse(201, newFollowUp, "FollowUp created successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error creating FollowUp: ${err.message}`)
    );
  }
};

// Get All FollowUps
const getAllFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find();
    res.status(200).json(
      new ApiResponse(200, followUps, "FollowUps fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching FollowUps: ${err.message}`)
    );
  }
};

// Get FollowUp by ID
const getFollowUpById = async (req, res) => {
  try {
    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) {
      return res.status(404).json(
        new ApiResponse(404, null, "FollowUp not found")
      );
    }
    res.status(200).json(
      new ApiResponse(200, followUp, "FollowUp fetched successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error fetching FollowUp: ${err.message}`)
    );
  }
};

// Update FollowUp
const updateFollowUp = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFollowUp = await FollowUp.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedFollowUp) {
      return res.status(404).json(
        new ApiResponse(404, null, "FollowUp not found for update")
      );
    }

    res.status(200).json(
      new ApiResponse(200, updatedFollowUp, "FollowUp updated successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error updating FollowUp: ${err.message}`)
    );
  }
};

// Delete FollowUp
const deleteFollowUp = async (req, res) => {
  try {
    const deletedFollowUp = await FollowUp.findByIdAndDelete(req.params.id);
    if (!deletedFollowUp) {
      return res.status(404).json(
        new ApiResponse(404, null, "FollowUp not found for deletion")
      );
    }

    res.status(200).json(
      new ApiResponse(200, null, "FollowUp deleted successfully")
    );
  } catch (err) {
    res.status(500).json(
      new ApiResponse(500, null, `Error deleting FollowUp: ${err.message}`)
    );
  }
};

export {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp
};
