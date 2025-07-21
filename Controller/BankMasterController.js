import Bank from "../Model/BankMasterModel.js";
import Banker from "../Model/BankerModel.js";
import Product from "../Model/CreateProductModel.js";

// Get all banks
export const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.find().populate("bankers").populate("products");
    res.status(200).json(banks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get a single bank
export const getBank = async (req, res) => {
  const { id } = req.params;

  try {
    const bank = await Bank.findById(id)
      .populate("bankers")
      .populate("products");
    if (!bank) return res.status(404).json({ message: "Bank not found" });

    res.status(200).json(bank);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new bank
export const createBank = async (req, res) => {
  const bankData = req.body;

  try {
    const newBank = new Bank(bankData);
    const products = await Product.find();

    newBank.products = products;
    await newBank.save();

    res.status(201).json(newBank);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a bank
export const updateBank = async (req, res) => {
  const { id } = req.params;
  const bankData = req.body;

  try {
    const updatedBank = await Bank.findByIdAndUpdate(id, bankData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBank)
      return res.status(404).json({ message: "Bank not found" });

    res.status(200).json(updatedBank);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bank
export const deleteBank = async (req, res) => {
  const { id } = req.params;

  try {
    // First delete all bankers associated with this bank
    await Banker.deleteMany({ bank: id });

    // Then delete the bank
    const deletedBank = await Bank.findByIdAndDelete(id);

    if (!deletedBank)
      return res.status(404).json({ message: "Bank not found" });

    res
      .status(200)
      .json({ message: "Bank and associated bankers deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bankers for a specific bank
export const getBankBankers = async (req, res) => {
  const { bankId } = req.params;

  try {
    const bankers = await Banker.find({ bank: bankId });
    res.status(200).json(bankers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};