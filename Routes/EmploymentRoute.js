import express from 'express';
import {
  createEmployment,
  getAllEmployments,
  getEmploymentById,
  updateEmployment,
  deleteEmployment
} from "../Controller/EmploymentController.js";

const router = express.Router();

router.post('/add-employment', createEmployment);
router.get('/get-employment', getAllEmployments);
router.get('/:id', getEmploymentById);
router.put('/update-employment/:id', updateEmployment);
router.delete('/delete-employment/:id', deleteEmployment);

export default router;
