// routes/loanRequirementRoutes.js
import express from 'express';
import {
  createLoanRequirement,
  getAllLoanRequirements,
  getLoanRequirementById,
  updateLoanRequirement,
  deleteLoanRequirement
} from '../Controller/loanLeadController.js';

const router = express.Router();

router.post('/add-loan-lead', createLoanRequirement);
router.get('/get-loan-lead', getAllLoanRequirements);
router.get('/get-loan-lead/:id', getLoanRequirementById);
router.put('/update-loan-lead/:id', updateLoanRequirement);
router.delete('/delete-loan-lead/:id', deleteLoanRequirement);

export default router;
