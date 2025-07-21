import mongoose from 'mongoose';

const rangeSchema = new mongoose.Schema({
  product: { type: String },
  start: { type: Number },
  end: { type: Number },
  percent: Number,
  amount: Number
}, { _id: false });

const incentiveStructureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetItems: [rangeSchema],
  disbursementItems: [rangeSchema],
  loginItems: [rangeSchema]
}, { timestamps: true });

const IncentiveStructure = mongoose.model('IncentiveStructure', incentiveStructureSchema);
export default IncentiveStructure;
