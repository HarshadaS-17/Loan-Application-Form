import LeadStatus from '../Model/LeadStatusModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';
import { asyncHandler } from '../Utils/asyncHandler.js';

// Create a new lead status
export const createLeadStatus = async (req, res) => {
  try {
    const { name, status } = req.body;

    const existing = await LeadStatus.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Lead status already exists' });
    }

    const newStatus = await LeadStatus.create({ name, status });
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lead status', error });
  }
};

// Get all lead statuses
export const getAllLeadStatuses = async (req, res) => {
  try {
    const statuses = await LeadStatus.find().sort({ createdAt: -1 });
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead statuses', error });
  }
};

// Delete lead status by ID
export const deleteLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LeadStatus.findByIdAndDelete(id);


    if (!deleted) {
      return res.status(404).json({ message: 'Lead status not found' });
    }

    res.status(200).json({ message: 'Lead status deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead status', error });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { name, status } = req.body;
    const existing = await LeadStatus.find({ name });
    if (!existing) {
      return res.status(400).json({ message: 'Lead status does not exists' });
    }
    const updatedLeadStatus = await LeadStatus.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    if (!updatedLeadStatus) {
      return res.status(404).json({ message: 'Lead status not found' });
    }
    res.status(200).json(new ApiResponse(200, updatedLeadStatus, 'Lead status updated successfully'));
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead status', error });
  }
}