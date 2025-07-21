import express from 'express';
import {
  createCaseStatus,
  getAllCaseStatuses,
  getCaseStatusById,
  updateCaseStatus,
  deleteCaseStatus
} from '../Controller/CaseStatusController.js';

const router = express.Router();

router.post('/add-casestatus', createCaseStatus);
router.get('/get-casestatuses', getAllCaseStatuses);
router.get('/:id', getCaseStatusById);
router.put('/update-casestatus/:id', updateCaseStatus);
router.delete('/delete-casestatus/:id', deleteCaseStatus);

export default router;
