import LoanCriteria from "../Model/LoanCriteriaModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// Get all criteria
export const getAllCriteria = asyncHandler(async (req, res) => {
  try {
    const loanCriteria = await LoanCriteria.find();
    console.log(loanCriteria);
    res
      .status(200)
      .json(
        new ApiResponse(200, loanCriteria, "Loan criteria fetch successfully")
      );
  } catch (error) {
    console.log(error);
  }
});

// Get criteria by type
export const getCriteriaByType = async (req, res) => {
  try {
    const { type } = req.params;
    const criteria = await LoanCriteria.find({ type });
    res.status(200).json(criteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new criteria
export const createCriteria = async (req, res) => {
  try {
    const {
      type,
      rangeStart,
      rangeEnd,
      salariedValue,
      nonSalariedValue,
      bankId,
      productId,
    } = req.body;

    const newCriteria = new LoanCriteria({
      type,
      rangeStart,
      rangeEnd,
      salariedValue,
      nonSalariedValue,
      productId,
      bankId,
    });

    const savedCriteria = await newCriteria.save();

    console.log("savedCriteria", savedCriteria);
    res.status(201).json(savedCriteria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update criteria
export const updateCriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { rangeStart, rangeEnd, salariedValue, nonSalariedValue } = req.body;

    const updatedCriteria = await LoanCriteria.findByIdAndUpdate(
      id,
      { rangeStart, rangeEnd, salariedValue, nonSalariedValue },
      { new: true }
    );

    if (!updatedCriteria) {
      return res.status(404).json({ message: "Criteria not found" });
    }

    res.status(200).json(updatedCriteria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete criteria
export const deleteCriteria = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCriteria = await LoanCriteria.findByIdAndDelete(id);

    if (!deletedCriteria) {
      return res.status(404).json({ message: "Criteria not found" });
    }

    res.status(200).json({ message: "Criteria deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoanCriteriaWithBankAndProduct = asyncHandler(
  async (req, res) => {
    try {
      const { bankId, productId } = req.params;
      console.log(req.params);

      const LoanCriteriaData = await LoanCriteria.find({ bankId, productId });
      const data = await LoanCriteria.find();
      console.log(LoanCriteriaData);
      res
        .status(200)
        .json(new ApiResponse(200, LoanCriteriaData, "Data send successfully"));
    } catch (error) {}
  }
);
