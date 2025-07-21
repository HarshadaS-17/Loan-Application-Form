import Branch from '../Model/MyBranchModels.js';

// Create new branch
export const createBranch = async (req, res) => {
  try {
    const newBranch = new Branch(req.body);
    await newBranch.save();
    res.status(201).json({ message: 'Branch created successfully', data: newBranch });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create branch', error });
  }
};

// Get all branches
export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json({ message: 'Branches fetched successfully', data: branches });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch branches', error });
  }
};

// Get a specific branch by ID
export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch fetched successfully', data: branch });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch branch', error });
  }
};

// Update a branch by ID
export const updateBranch = async (req, res) => {
  try {
    const updatedBranch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch updated successfully', data: updatedBranch });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update branch', error });
  }
};

// Delete a branch by ID
export const deleteBranch = async (req, res) => {
  try {
    const deletedBranch = await Branch.findByIdAndDelete(req.params.id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.status(200).json({ message: 'Branch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete branch', error });
  }
};
