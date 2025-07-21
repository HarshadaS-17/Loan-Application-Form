import Banker from "../Model/BankerModel.js";
import Bank from "../Model/BankMasterModel.js";

// Create a new banker
export const createBanker = async (req, res) => {
  const { bankId } = req.params;
  const bankerData = { ...req.body, bank: bankId };

  try {
    // Check if bank exists
    const bank = await Bank.findById(bankId);
    if (!bank) return res.status(404).json({ message: "Bank not found" });

    const newBanker = new Banker(bankerData);
    await newBanker.save();

    // Add banker to bank's bankers array
    bank.bankers.push(newBanker._id);
    await bank.save();

    res.status(201).json(newBanker);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all bankers for a specific bank
export const getAllBankers = async (req, res) => {
  const { bankId } = req.params;

  try {
    const bankers = await Banker.find({ bank: bankId });
    console.log("✅ Banker found:", bankers);
    res.status(200).json(bankers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  

// Update a banker
export const updateBanker = async (req, res) => {
  const { bankerId } = req.params;
  const bankerData = req.body;

  try {
    const updatedBanker = await Banker.findByIdAndUpdate(bankerId, bankerData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBanker)
      return res.status(404).json({ message: "Banker not found" });

    res.status(200).json(updatedBanker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a banker
export const deleteBanker = async (req, res) => {
  const { bankerId, bankId } = req.params;

  try {
    // Remove banker from bank's bankers array
    await Bank.findByIdAndUpdate(
      bankId,
      { $pull: { bankers: bankerId } },
      { new: true }
    );

    // Delete the banker
    const deletedBanker = await Banker.findByIdAndDelete(bankerId);

    if (!deletedBanker)
      return res.status(404).json({ message: "Banker not found" });

    res.status(200).json({ message: "Banker deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
