import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  isHo: { type: Boolean, default: false },
}, { timestamps: true });

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;
