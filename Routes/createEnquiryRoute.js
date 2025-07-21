// routes/enquiryRoutes.js
import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  updateStatus,
} from '../Controller/createEnquiryController.js';

const router = express.Router();

router.post('/add-enquiry', createEnquiry);
router.get('/get-enquiry', getAllEnquiries);
router.get('/:id', getEnquiryById);
router.put('/update-enquiry/:id', updateEnquiry);
router.delete('/delete-enquiry/:id', deleteEnquiry);

// patch for upate enquiry status only route 
router.patch('/update-status/:id',updateStatus)

export default router;
