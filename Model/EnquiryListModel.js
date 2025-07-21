import mongoose, { Schema } from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
     title: {
      type: String,
      enum: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Other"],
    },
    applicant: { type: String, required: true },
    mobile: { type: String, required: true },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    alternatePhone: { type: String },
    email: { type: String, required: true },
    dateOfBirth: { type: Date },
    panNo: { type: String },
    employmentType: {
      type: String,
      required: true,
    },
    leadSource: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    companyName: { type: String },
    monthlyIncome: { type: Number },
    payingEMI: { type: Number },
    totalWorkExperience: { type: Number },
    businessType: { type: String },
    annualProfitAfterTax: { type: Number },
    annualTurnover: { type: Number },
    totalRunningBusinessYears: { type: Number },
    professionalType: { type: String },
    annualGrossReceipts: { type: Number },
    totalPracticeYears: { type: Number },
    occupationType: { type: String },
    status: {
      type: String,
      // enum: ["Not Contacted", "Contacted", "Converted", "Not Intrested"],
      default: "Not Contacted",
    },
    remark: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remark",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const EnquiryList = mongoose.model("EnquiryList", enquirySchema);

export default EnquiryList;
