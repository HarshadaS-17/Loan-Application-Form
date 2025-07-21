// import { application } from "express";
// import LoanApplication from "../Model/LoanApplicationModel.js";
// import LoanRequirement from "../Model/loanLeadModel.js";
// import { ApiError } from "../Utils/ApiError.js";
// import { ApiResponse } from "../Utils/ApiResponse.js";
// import { asyncHandler } from "../Utils/asyncHandler.js";

// // ➤ Create Loan Requirement
// export const createLoanRequirement = asyncHandler(async (req, res) => {
//   console.log(req.body);
//   const loan = await LoanRequirement.create(req.body);
//   console.log(loan);
//   if (!loan) {
//     throw new ApiError(400, "Failed to create loan requirement");
//   }

//   return res
//     .status(201)
//     .json(new ApiResponse(201, loan, "Loan requirement created successfully"));
// });

// // ➤ Get All Loan Requirements
// export const getAllLoanRequirements = asyncHandler(async (req, res) => {
//   const loans = await LoanRequirement.find();
//   if (!loans.length) {
//     throw new ApiError(404, "No loan requirements found");
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, loans, "Loan requirements fetched successfully")
//     );
// });

// // ➤ Get Loan Requirement by ID
// export const getLoanRequirementById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const loan = await LoanRequirement.findById(id);
//   let application = null;

//   if (loan.loanApllicationId) {
//     //   If loan has an application, populate it
//     application = await LoanApplication.findById(
//       loan.loanApllicationId
//     ).populate(
//       "userId loanDetails.loanType loanDetails.state loanDetails.city  loanDetails.preferredBank employmentDetails.employmentType"
//     );
//   }

//   console.log(application);

//   if (!loan) {
//     throw new ApiError(404, "Loan requirement not found");
//   }

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         loan,
//         ...(application && { application }),
//       },
//       "Loan requirement fetched successfully"
//     )
//   );
// });

// export const updateLoanRequirement = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // // Validate ObjectId
//   // if (!mongoose.Types.ObjectId.isValid(id)) {
//   //   throw new ApiError(400, "Invalid loan requirement ID");
//   // }

//   // Destructure request body
//   const {
//     firstName,
//     lastName,
//     email,
//     mobile,
//     requiredLoanAmount,
//     productType,
//     leadSource,
//     branch,
//     ltv,
//     propertyName,
//     propertyState,
//     propertyCity,
//     propertyPinCode,
//   } = req.body;

//   // Build updated data object
//   const updatedData = {
//     firstName: firstName?.trim(),
//     lastName: lastName?.trim(),
//     email: email?.trim(),
//     mobile,
//     requiredLoanAmount: requiredLoanAmount
//       ? Number(requiredLoanAmount)
//       : undefined,
//     productType,
//     leadSource,
//     branch,
//     ltv: ltv ? Number(ltv) : undefined,
//     property: {
//       name: propertyName,
//       state: propertyState,
//       city: propertyCity,
//       pinCode: propertyPinCode ? Number(propertyPinCode) : undefined,
//     },
//   };

//   // Remove undefined keys to avoid overwriting with undefined
//   Object.keys(updatedData).forEach(
//     (key) => updatedData[key] === undefined && delete updatedData[key]
//   );
//   Object.keys(updatedData.property).forEach(
//     (key) =>
//       updatedData.property[key] === undefined &&
//       delete updatedData.property[key]
//   );

//   // Update the loan requirement
//   const loan = await LoanRequirement.findByIdAndUpdate(id, updatedData, {
//     new: true,
//   });

//   if (!loan) {
//     throw new ApiError(404, "Loan requirement not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, loan, "Loan requirement updated successfully"));
// });

// // ➤ Delete Loan Requirement
// export const deleteLoanRequirement = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const loan = await LoanRequirement.findByIdAndDelete(id);

//   if (!loan) {
//     throw new ApiError(404, "Loan requirement not found");
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, loan, "Loan requirement deleted successfully"));
// });




import LoanApplication from "../Model/LoanApplicationModel.js";
import LoanRequirement from "../Model/loanLeadModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// ➤ Create Loan Requirement
export const createLoanRequirement = asyncHandler(async (req, res) => {
  const loan = await LoanRequirement.create(req.body);

  if (!loan) {
    throw new ApiError(400, "Failed to create loan requirement");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, loan, "Loan requirement created successfully"));
});

// ➤ Get All Loan Requirements
export const getAllLoanRequirements = asyncHandler(async (req, res) => {
  const loans = await LoanRequirement.find();

  if (!loans.length) {
    throw new ApiError(404, "No loan requirements found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, loans, "Loan requirements fetched successfully")
    );
});

// ➤ Get Loan Requirement by ID (with application populated if available)
export const getLoanRequirementById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const loan = await LoanRequirement.findById(id);

  if (!loan) {
    throw new ApiError(404, "Loan requirement not found");
  }

  let application = null;
  if (loan.loanApplicationId) {
    application = await LoanApplication.findById(
      loan.loanApplicationId
    ).populate(
      "userId loanDetails.loanType loanDetails.state loanDetails.city loanDetails.preferredBank employmentDetails.employmentType"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        loan,
        ...(application && { application }),
      },
      "Loan requirement fetched successfully"
    )
  );
});

// ➤ Update Loan Requirement
export const updateLoanRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    email,
    mobile,
    requiredLoanAmount,
    productType,
    leadSource,
    propertyFinalised,
    propertyStatus,
    propertyType,
    propertyValue,
    unitType,
    propertyAddress,
    propertyCity,
    propertyState,
    societyName,
    reraNumber,
    loanApplicationId,
  } = req.body;

  const updatedData = {
    firstName: firstName?.trim(),
    lastName: lastName?.trim(),
    email: email?.trim(),
    mobile,
    requiredLoanAmount: requiredLoanAmount
      ? Number(requiredLoanAmount)
      : undefined,
    productType,
    leadSource,
    propertyFinalised,
    propertyStatus,
    propertyType,
    propertyValue: propertyValue ? Number(propertyValue) : undefined,
    unitType,
    propertyAddress,
    propertyCity,
    propertyState,
    societyName,
    reraNumber,
    loanApplicationId,
  };

  // Clean out undefined values
  Object.keys(updatedData).forEach(
    (key) => updatedData[key] === undefined && delete updatedData[key]
  );

  const loan = await LoanRequirement.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!loan) {
    throw new ApiError(404, "Loan requirement not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, loan, "Loan requirement updated successfully"));
});

// ➤ Delete Loan Requirement
export const deleteLoanRequirement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loan = await LoanRequirement.findByIdAndDelete(id);

  if (!loan) {
    throw new ApiError(404, "Loan requirement not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, loan, "Loan requirement deleted successfully"));
});
