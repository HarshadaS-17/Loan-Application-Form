import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
});

const DocumentMasterSchema = new mongoose.Schema(
  {
    productType: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Salaried", "Self-Employed"],
      required: true,
    },
    documents: [DocumentSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DocumentMaster", DocumentMasterSchema);
