import express from 'express';
import {
  createLeadType,
  getAllLeadTypes,
  getLeadTypeById,
  updateLeadType,
  deleteLeadType
} from "../Controller/LeadTypeController.js";

const router = express.Router();

router.post('/add-lead-type', createLeadType);
router.get('/get-lead-types', getAllLeadTypes);
router.get('/:id', getLeadTypeById);
router.put('/update-lead-type/:id', updateLeadType);
router.delete('/delete-lead-type/:id', deleteLeadType);

export default router;
