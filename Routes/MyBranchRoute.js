import express from 'express';
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from '../Controller/MyBranchController.js';

const router = express.Router();

// CRUD Routes
router.post('/add-branch', createBranch);  // Create a new branch
router.get('/get-branches', getAllBranches); // Get all branches
router.get('/branches/:id', getBranchById); // Get a branch by ID
router.put('/update-branch/:id', updateBranch); // Update a branch by ID
router.delete('/delete-branch/:id', deleteBranch); // Delete a branch by ID

export default router;
