import mongoose from "mongoose";

const loanCriteriaSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true,
    enum: ["Cibil Score", "FOIR", "LTV"],
  },
  rangeStart: {
    type: Number,
    required: true,
  },
  rangeEnd: {
    type: Number,
    required: true,
  },
  salariedValue: {
    type: Number,
    required: true,
  },
  nonSalariedValue: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  bankId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bank",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});

// Update the updatedAt field before saving
loanCriteriaSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const LoanCriteria = mongoose.model("LoanCriteriaSec", loanCriteriaSchema);

export default LoanCriteria;