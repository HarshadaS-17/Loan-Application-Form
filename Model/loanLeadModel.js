import mongoose from "mongoose";
const { Schema, model } = mongoose;
const loanRequirementSchema = new Schema(
  {
    enq: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Other"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    panNo: {
      type: String,
      uppercase: true,
      validate: {
        validator: function (v) {
          return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid PAN number!`,
      },
    },
    dateOfBirth: {
      type: Date,
    },
    employmentType: {
      type: String,
      required: true,
    },
    requiredLoanAmount: {
      type: Number,
    },
    productType: {
      type: String,
    },
    leadSource: {
      type: String,
    },
    propertyFinalised: {
      type: String,
      enum: ["Yes", "No"],
    },
    propertyStatus: {
      type: String,
      enum: ["Ready", "Under Construction"],
    },
    propertyType: {
      type: String,
      enum: [
        "Flat",
        "Independent House",
        "Row House",
        "Plot",
        "Commercial",
        "Other",
      ],
    },
    propertyValue: {
      type: Number,
    },
    unitType: {
      type: String,
      enum: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Studio", "Villa", "Other"],
    },
    propertyAddress: {
      type: String,
    },
    propertyCity: {
      type: String,
    },
    propertyState: {
      type: String,
    },
    societyName: {
      type: String,
    },
    reraNumber: {
      type: String,
    },
    loanApllicationId: {
      type: Schema.Types.ObjectId,
      ref: "LoanApplication",
      default: null,
    },
  },
  { timestamps: true }
);

const LoanRequirement = model("LoanRequirement", loanRequirementSchema);

export default LoanRequirement;