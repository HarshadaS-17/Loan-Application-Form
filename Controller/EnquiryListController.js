import Employee from "../Model/employeeMasterModel.js";
import EnquiryList from "../Model/EnquiryListModel.js";
import LoanRequirement from "../Model/loanLeadModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// Create a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = new EnquiryList(req.body);
    await enquiry.save();
    res
      .status(201)
      .json(new ApiResponse(201, enquiry, "Enquiry created successfully"));
  } catch (error) {
    res.status(500).json({ message: "Error creating enquiry", error });
  }
};

// Get all enquiries
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await EnquiryList.find()
      .populate({
        path: "remark",
        select: "leadType leadStage nextFollowUpDateTime status remarkText"
      })



    res.status(200).json(new ApiResponse(200, enquiries, "Enquiry data"));
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiries", error });
  }
};

// Get enquiry by ID
export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await EnquiryList.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enquiry", error });
  }
};

// Update an enquiry
export const updateEnquiry = async (req, res) => {
  try {
    const updatedEnquiry = await EnquiryList.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }


    res
      .status(200)
      .json(
        new ApiResponse(200, updatedEnquiry, "Enquiry updated successfully")
      );
  } catch (error) {
    res.status(500).json({ message: "Error updating enquiry", error });
  }
};

// Delete an enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const deletedEnquiry = await EnquiryList.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting enquiry", error });
  }
};

export const updateAllocation = asyncHandler(async (req, res) => {
  try {
    const { enqId, empId } = req.body;

    const Enq = await EnquiryList.findById(enqId);

    if (!Enq) {
      throw new ApiError(400, "enquirty not found");
    }

    const emp = await Employee.findById(empId);
    if (!emp) {
      throw new ApiError(400, "Invalid EMployee");
    }

    Enq.allocatedTo = empId;
    await Enq.save();

    res.status(200).json(new ApiResponse(200, {}, "Successfully allocate"));
  } catch (error) {
    throw new ApiError(400, "Failed to change the alloation to emp");
  }
});

// transfer enquiery

// export const transferEnq = asyncHandler(async (req, res) => {
//   try {
//     const { enquiryId } = req.params;

//     const listOfEnq = await EnquiryList.find();
//     const enq = await EnquiryList.findById(enquiryId);
//     if (!enq) {
//       throw new ApiError(404, "Enq not found");
//     }
//     const trasferdEnq = enq;


//     await listOfEnq.pop(enq);

//     const leads = await LoanRequirement.find();


//     const addedLead = await leads([...leads, trasferdEnq]);

//     return res
//       .status(200)
//       .json(new ApiResponse(200, addedLead, "Trasnfer successfully"));
//   } catch (error) {
//     throw new ApiError(400, "Failed to trasfer");
//   }
// });

export const transferEnq = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  // Step 1: Find the enquiry
  const enquiry = await EnquiryList.findById(enquiryId);
  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  // Step 2: Transfer enquiry fields directly
  const loanLeadData = {
    enq: enquiry.toObject(), // Embed full object here

    firstName: enquiry.applicant?.split(" ")[0] || "",
    lastName: enquiry.applicant?.split(" ")[1] || "",
    email: enquiry.email || "",
    mobile: enquiry.mobile,
    productType: enquiry.productType,
    leadSource: enquiry.leadSource,
    employmentType: enquiry.employmentType, // ✅ required field added

    // These fields can be filled later
    requiredLoanAmount: null,
    branch: "",
    ltv: null,
    property: {
      name: "",
      state: "",
      city: "",
      pinCode: null,
    },
  };

  // Step 3: Create LoanRequirement
  const newLoanLead = await LoanRequirement.create(loanLeadData);

  // Step 4: Delete enquiry
  await EnquiryList.findByIdAndDelete(enquiryId);

  // Step 5: Respond
  return res
    .status(200)
    .json(new ApiResponse(200, newLoanLead, "Enquiry transferred and deleted"));
});
