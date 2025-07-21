import express from 'express';
import {
  createIncentiveStructure,
  getAllIncentiveStructures,
  getIncentiveStructureById,
  updateIncentiveStructure,
  deleteIncentiveStructure
} from '../Controller/IncentiveStructureController.js';

const router = express.Router();

router.post('/add-incentive', createIncentiveStructure);
router.get('/get-incentive', getAllIncentiveStructures);
router.get('/:id', getIncentiveStructureById);
router.put('/update-incentive/:id', updateIncentiveStructure);
router.delete('/delete-incentive/:id', deleteIncentiveStructure);

export default router;
