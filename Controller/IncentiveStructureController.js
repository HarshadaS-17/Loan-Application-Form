import IncentiveStructure from '../Model/IncentiveStructureModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create
export const createIncentiveStructure = async (req, res) => {
  try {
    const { name, targetItems, disbursementItems, loginItems } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newStructure = new IncentiveStructure({
      name,
      targetItems,
      disbursementItems,
      loginItems
    });

    await newStructure.save();
    res.status(201).json({ message: 'Created successfully', data: newStructure });
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get All
export const getAllIncentiveStructures = async (req, res) => {
  try {
    const structures = await IncentiveStructure.find();
    res.status(200).json(new ApiResponse(200, structures, 'Incentive Structures fetched successfully'));
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single
export const getIncentiveStructureById = async (req, res) => {
  try {
    const { id } = req.params;
    const structure = await IncentiveStructure.findById(id);
    if (!structure) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(structure);
  } catch (error) {
    console.error('Fetch Single Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update
export const updateIncentiveStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, targetItems, disbursementItems, loginItems } = req.body;

    const updated = await IncentiveStructure.findByIdAndUpdate(
      id,
      { name, targetItems, disbursementItems, loginItems },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Updated successfully', data: updated });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete
export const deleteIncentiveStructure = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IncentiveStructure.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
