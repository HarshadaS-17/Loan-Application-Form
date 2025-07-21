import mongoose from "mongoose";

// Define the bank name schema
const bankNameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const BankName = mongoose.model("BankName", bankNameSchema);

export default BankName;
