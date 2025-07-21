import Source from '../Model/CreateLeadSourceModel.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

// Create Lead Source
const createSource = async (req, res) => {
  try {
    const { name, features } = req.body;
    const newSource = new Source({ name, features });
    await newSource.save();
    res.status(201).json(new ApiResponse(200, newSource, 'Source created successfully'));
  } catch (err) {
    console.error('Error creating source:', err.message);
    res.status(500).json(new ApiResponse(500, null, 'Error creating source', err.message));
  }
};

// Get All Lead Sources
const getAllSources = async (req, res) => {
  try {
    const sources = await Source.find();
    if (!sources || sources.length === 0) {
      return res.status(404).json(new ApiResponse(404, null, 'No sources found'));
    }
    res.status(200).json(new ApiResponse(200, sources, 'Sources fetched successfully'));
  } catch (err) {
    console.error('Error fetching sources:', err.message);
    res.status(500).json(new ApiResponse(500, null, 'Error fetching sources', err.message));
  }
};

// Get Lead Source by ID
const getSourceById = async (req, res) => {
  try {
    const source = await Source.findById(req.params.id);
    if (!source) {
      return res.status(404).json(new ApiResponse(404, null, 'Source not found'));
    }
    res.status(200).json(new ApiResponse(200, source, 'Source fetched successfully'));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, 'Error fetching source', err.message));
  }
};

// Update Lead Source
const updateSource = async (req, res) => {
  try {
    const { name, features } = req.body;
    const updatedSource = await Source.findByIdAndUpdate(
      req.params.id,
      { name, features },
      { new: true }
    );
    if (!updatedSource) {
      return res.status(404).json(new ApiResponse(404, null, 'Source not found to update'));
    }
    res.status(200).json(new ApiResponse(200, updatedSource, 'Source updated successfully'));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, 'Error updating source', err.message));
  }
};

// Delete Lead Source
const deleteSource = async (req, res) => {
  try {
    const deletedSource = await Source.findByIdAndDelete(req.params.id);
    if (!deletedSource) {
      return res.status(404).json(new ApiResponse(404, null, 'Source not found to delete'));
    }
    res.status(200).json(new ApiResponse(200, null, 'Source deleted successfully'));
  } catch (err) {
    res.status(500).json(new ApiResponse(500, null, 'Error deleting source', err.message));
  }
};

export {
  createSource,
  getAllSources,
  getSourceById,
  updateSource,
  deleteSource
};