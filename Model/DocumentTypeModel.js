import mongoose from "mongoose";

const documentTypeSchema = new mongoose.Schema(
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

const DocumentType = mongoose.model("DocumentType", documentTypeSchema);
export default DocumentType;
