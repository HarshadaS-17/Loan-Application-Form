// import express from "express";
// import {
//   createLoanApplication,
//   getAllLoanApplications,
//   getLoanApplication,
//   updateLoanApplication,
//   deleteLoanApplication,
//   getApplicationStatus,
// } from "../Controller/LoanApplicationController.js";

// const router = express.Router();

// // Create a new loan application
// router.post("/add-data", createLoanApplication);

// // Get all loan applications (admin only)
// router.get("/get-data", getAllLoanApplications);

// // Get a specific loan application
// router.get("/get-data/:id", getLoanApplication);

// // Update a loan application
// router.put("/update-data/:id", updateLoanApplication);

// // Delete a loan application
// router.delete("/delete-data/:id", deleteLoanApplication);

// // Check application status
// router.get("/:id/status", getApplicationStatus);

// export default router;




// -----------------------------------------------------------



import express from "express";
import {
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  deleteLoanApplication,
  getLoanApplicationsByUserId
} from "../Controller/LoanApplicationController.js";

const router = express.Router();

// POST - create
router.post("/add-data/:userId", createLoanApplication);

// GET - all
router.get("/get-data", getAllLoanApplications);

// GET - by id
router.get("/get-data/:id", getLoanApplicationById);

// Get By User ID
router.get("/get-loan-application/:userId", getLoanApplicationsByUserId);

// PUT - update
// router.put("/update-data/:userId/:id", updateLoanApplication);
router.put("/update-data/:userId", updateLoanApplication);

// DELETE - delete
router.delete("/delete-data/:userId", deleteLoanApplication);

export default router;

