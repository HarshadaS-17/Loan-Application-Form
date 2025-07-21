import express from 'express';
import {
  createLeadStage,
  getAllLeadStages,
  getLeadStageById,
  updateLeadStage,
  deleteLeadStage
} from '../Controller/LeadStageController.js';

const router = express.Router();

router.post('/add-leadstage', createLeadStage);
router.get('/get-leadstages', getAllLeadStages);
router.get('/:id', getLeadStageById);
router.put('/update-leadstage/:id', updateLeadStage);
router.delete('/delete-leadstage/:id', deleteLeadStage);

export default router;
