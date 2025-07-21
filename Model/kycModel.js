import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  aadhaar: String,
  pan: String,
  mobile: String,
  dob: String,
  status: {
    type: String,
    enum: ["pending", "rerified", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("KYC", KYCSchema);
