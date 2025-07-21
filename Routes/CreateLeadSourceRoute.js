// Routes/CreateLeadSourceRouter.js
import express from 'express';
import {
  createSource,
  getAllSources,
  getSourceById,
  updateSource,
  deleteSource
} from '../Controller/CreateLeadSourceController.js';

const router = express.Router();

router.post('/add-source', createSource);
router.get('/get-sources', getAllSources);
router.get('/:id', getSourceById);
router.put('/update-source/:id', updateSource);
router.delete('/delete-source/:id', deleteSource);

export default router;
