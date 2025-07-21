import mongoose from 'mongoose';

// Define the FollowUp schema
const followUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const FollowUp = mongoose.model('FollowUp', followUpSchema);
export default FollowUp;
