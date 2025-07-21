import e from "express";
import EnquiryList from "../Model/EnquiryListModel.js";
import Remark from "../Model/remarkModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// @desc    Create a new remark
// @route   POST /api/remarks/add-remark
// @access  Public or Protected (based on auth)
export const createRemark = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      remarkText,
      status,
      nextFollowUpDateTime,
      leadStage,
      leadStatus,
      leadType,
    } = req.body;

    // Required field check
    if (!remarkText || !status) {
      return res
        .status(400)
        .json({ message: "EnquiryId, RemarkText and Status are required" });
    }

    const enq = await EnquiryList.findById(id);

    if (!enq) {
      throw new ApiError(401, "Enquiry not found");
    }

    if (!enq.remark) {
      const newRemark = new Remark({
        enquiryId: enq._id,
        remarkText,
        status,
        nextFollowUpDateTime,
        leadStage,
        leadStatus,
        leadType,
      });

      const savedRemark = await newRemark.save();

      enq.status = status;
      enq.remark = savedRemark._id;
      await enq.save();
      return res.status(201).json({
        message: "Remark added successfully",
        data: savedRemark,
      });
    } else {
      const enq = await EnquiryList.findById(id);
      if (!enq) {
        throw new ApiError(401, "Enquiry not found");
      }

      const remark = await Remark.findById(enq.remark);
      if (!remark) {
        throw new ApiError(401, "Remark not found");
      }

      // Maintain history (Fixing typo to access correct property 'history')
      const maintainHistory = [
        ...remark.history, // Corrected typo here
        {
          nextFollowUpDateTime: remark.nextFollowUpDateTime,
          remarkText: remark.remarkText,
          status: remark.status,
          changeDate: remark.updatedAt,
        },
      ];

      // Update remark with new values
      remark.remarkText = remarkText;
      remark.status = status;
      remark.nextFollowUpDateTime = nextFollowUpDateTime;
      remark.leadStage = leadStage;
      remark.leadStatus = leadStatus;
      remark.leadType = leadType;
      remark.history = maintainHistory; // Update history field
      enq.status = status;
      // Save the updated remark
      const updatedRemark = await remark.save(); // Use save to get the updated remark

      // Save the enquiry as well
      await enq.save();

      // Return the updated remark in the   response
      return res
        .status(200)
        .json(new ApiResponse(200, updatedRemark, "Remark updated"));
    }
  } catch (error) {
    console.error("Error creating remark:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// @desc    Get all remarks for a specific enquiryId
// @route   GET /api/remarks/:enquiryId
// @access  Public or Protected (based on auth)
export const getRemarksByEnquiryId = async (req, res) => {
  try {
    const { enquiryId } = req.params;

    if (!enquiryId) {
      return res
        .status(400)
        .json({ message: "EnquiryId parameter is required" });
    }

    const remarks = await Remark.find({ enquiryId }).sort({ createdAt: -1 });

    return res.status(200).json(remarks);
  } catch (error) {
    console.error("Error fetching remarks:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// const editRemark = asyncHandler(async (req, res) => {
//   try {
//     const { remarkId, enqId } = req.query;

//     const {
//       remarkText,
//       status,
//       nextFollowUpDateTime,
//       leadStage,
//       leadStatus,
//       leadType,
//     } = req.body;
//   } catch (error) {
//     throw new ApiError(400, "Failed to update");
//   }
// });

const getHistory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the remark by its ID
    const remark = await Remark.findById(id);

    if (!remark) {
      throw new ApiError(400, "Remark not found");
    }

    // Check if the history exists and is an array, if not, return an empty array
    const history = remark.history || [];


    // Return the history (even if it's empty)
    return res
      .status(200)
      .json(new ApiResponse(200, history, "Remark history"));
  } catch (error) {
    // If any error occurs, return a standard error message
    throw new ApiError(400, "Failed to fetch remark history");
  }
});


const getRemarkById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;


    const remark = await Remark.findById(id);

    if (!remark) {
      throw new ApiError(200, "Failed to fetch the data");
    }

    res.status(200).json(new ApiResponse(200, remark, "Remark fetch successfully"))

  } catch (error) {
    throw new ApiError(400, "Something went wrong in get remark ")
  }
})

export { getHistory, getRemarkById };




