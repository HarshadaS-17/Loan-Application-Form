import express from 'express';
import {
  createFollowUp,
  getAllFollowUps,
  getFollowUpById,
  updateFollowUp,
  deleteFollowUp
} from '../Controller/FollowUpsMasterController.js';

const router = express.Router();

router.post('/add-followup', createFollowUp);
router.get('/get-followups', getAllFollowUps);
router.get('/:id', getFollowUpById);
router.put('/update-followup/:id', updateFollowUp);
router.delete('/delete-followup/:id', deleteFollowUp);

export default router;
