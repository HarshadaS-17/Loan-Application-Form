import express from 'express';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
  updateAllocation,
  transferEnq,
} from "../Controller/EnquiryListController.js";

const router = express.Router();

// Create a new enquiry
router.post("/add-enquiries", createEnquiry);

// Get all enquiries
router.get("/get-enquiries", getAllEnquiries);

// Get a specific enquiry by ID
router.get("/enquiries/:id", getEnquiryById);

// Update an enquiry by ID
router.put("/update-enquiries/:id", updateEnquiry);

// Delete an enquiry by ID
router.delete("/delete-enquiries/:id", deleteEnquiry);

router.route("/allocatedto").patch(updateAllocation);

// transfer enqueiry

router.post("/transfer/:enquiryId", transferEnq);


export default router;
