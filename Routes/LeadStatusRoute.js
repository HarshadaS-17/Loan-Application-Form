import express from 'express';
import {
  createLeadStatus,
  getAllLeadStatuses,
  deleteLeadStatus,
  updateLeadStatus,
} from '../Controller/LeadStatusController.js';

const router = express.Router();

// Create
router.post('/add-leads', createLeadStatus);

// Read All
router.get('/get-leads', getAllLeadStatuses);

// Delete by ID
router.delete('/delete-lead/:id', deleteLeadStatus);

router.route("/update-lead/:id").put(updateLeadStatus);

export default router;
