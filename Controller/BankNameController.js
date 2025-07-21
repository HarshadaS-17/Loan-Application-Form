import BankName from "../Model/BankNameModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// Create BankName
const createBankName = async (req, res) => {
  try {
    const { name } = req.body;
    const newBankName = new BankName({ name });
    await newBankName.save();

    res
      .status(201)
      .json(
        new ApiResponse(201, { newBankName }, "Bank name created successfully")
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, `Error creating bank name: ${err.message}`)
      );
  }
};

// Get All BankNames
const getAllBankNames = async (req, res) => {
  try {
    const bankNames = await BankName.find();
    res
      .status(200)
      .json(new ApiResponse(200, bankNames, "Bank names fetched successfully"));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, `Error fetching bank names: ${err.message}`)
      );
  }
};

// Get BankName by ID
const getBankNameById = async (req, res) => {
  try {
    const bankName = await BankName.findById(req.params.id);
    if (!bankName) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Bank name not found"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, bankName, "Bank name fetched successfully"));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, `Error fetching bank name: ${err.message}`)
      );
  }
};

// Update BankName
const updateBankName = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedBankName = await BankName.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedBankName) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Bank name not found for update"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedBankName, "Bank name updated successfully")
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, `Error updating bank name: ${err.message}`)
      );
  }
};

// Delete BankName
const deleteBankName = async (req, res) => {
  try {
    const deletedBankName = await BankName.findByIdAndDelete(req.params.id);
    if (!deletedBankName) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Bank name not found for deletion"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Bank name deleted successfully"));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(500, null, `Error deleting bank name: ${err.message}`)
      );
  }
};

export {
  createBankName,
  getAllBankNames,
  getBankNameById,
  updateBankName,
  deleteBankName,
};
