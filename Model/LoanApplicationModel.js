import mongoose from "mongoose";

// Sub-schemas
const loanSchema = new mongoose.Schema(
  {
    loanType: {
      type: String,
      required: true,
      default: null,
    },
    bankName: {
      type: String,
      required: true,
    },
    outstandingAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    emi: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const creditCardSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      min: 0,
    },
    outstanding: {
      type: Number,
      min: 0,
    },
  },
  { _id: false }
);

const coApplicantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      required: true,
      enum: [
        "spouse",
        "father",
        "mother",
        "son",
        "daughter",
        "brother",
        "sister",
        "other",
      ],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    panNo: {
      type: String,
      required: true,
      uppercase: true,
    },
    aadharNumber: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    monthlyIncome: {
      type: Number,
      min: 0,
    },
    existingLoans: [loanSchema],
    totalMonthlyEmi: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { _id: true }
);

const employmentDetailsSchema = new mongoose.Schema(
  {
    // In your Mongoose schema or equivalent
    employmentType: {
      type: String,
      required: true,
    },
    companyName: { type: String, trim: true },
    designation: { type: String, trim: true },
    workExperience: { type: String },
    employeeId: { type: String, trim: true },
    officeAddress: { type: String, trim: true },
    businessType: { type: String, trim: true },
    businessVintage: { type: String },
    annualTurnover: { type: Number, min: 0 },
    monthlyIncome: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const financialDetailsSchema = new mongoose.Schema(
  {
    bankName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    ifscCode: {
      type: String,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ["savings", "current", "salary"],
    },
    existingLoans: [loanSchema],
    creditCards: [creditCardSchema],
    monthlyExpenses: { type: Number, min: 0 },
    assets: { type: Number, min: 0 },
  },
  { _id: false }
);

const loanDetailsSchema = new mongoose.Schema({
  loanType: {
    type: String,
    required: true,
  },
  loanAmount: { type: Number, required: true, min: 0 },
  tenure: { type: Number, default: "", min: 1, max: 30 },
  preferredBank: [
    {
      type: String,
      required: true,
    },
  ],
  preferredBranch: [
    {
      type: String,
      required: true,
    },
  ],

  // Personal
  title: {
    type: String,
    enum: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Other"],
  },
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  maritalStatus: {
    type: String,
    required: true,
    enum: ["single", "married", "divorced", "widowed"],
  },
  nationality: {
    type: String,
    enum: ["Indian", "Other"],
    required: true,
  },

  //Current Address
  currentAddress: { type: String, required: true, trim: true },
  currentCity: {
    type: String,
    required: true,
  },
  currentState: {
    type: String,
    required: true,
  },
  currentPincode: {
    type: String,
    required: true,
  },

  // Permanent Address
  permanentAddress: { type: String, required: true, trim: true },
  permanentCity: {
    type: String,
    required: true,
  },
  permanentState: {
    type: String,
    required: true,
  },
  permanentPincode: {
    type: String,
    required: true,
  },

  // KYC
  panNo: {
    type: String,
    required: true,
    uppercase: true,
    // match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please enter a valid PAN number"],
  },
  aadharNumber: {
    type: String,
    required: true,
    // match: [/^\d{12}$/, "Please enter a valid 12-digit Aadhar number"],
  },
});

// Main Schema
const loanApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoanRequirement",
      default: null,
    },

    // Loan Information
    loanDetails: { type: loanDetailsSchema, required: true },

    // Employment & Financials
    employmentDetails: {
      type: employmentDetailsSchema,
      required: true,
    },
    financialDetails: {
      type: financialDetailsSchema,
      required: true,
    },

    // Co-applicants
    coApplicants: [coApplicantSchema],

    // Status
    status: {
      type: String,
      enum: ["pending", "under-review", "approved", "rejected", "disbursed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Removed manual updatedAt hook — already handled by timestamps
const LoanApplication = mongoose.model(
  "LoanApplication",
  loanApplicationSchema
);
export default LoanApplication;
