import mongoose from 'mongoose';

// Define the LeadStage schema
const leadStageSchema = new mongoose.Schema(
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

const LeadStage = mongoose.model('LeadStage', leadStageSchema);
export default LeadStage;
