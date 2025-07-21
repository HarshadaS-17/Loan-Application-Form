import mongoose from 'mongoose';

// Define the CaseStatus schema
const caseStatusSchema = new mongoose.Schema(
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

const CaseStatus = mongoose.model('CaseStatus', caseStatusSchema);
export default CaseStatus;
