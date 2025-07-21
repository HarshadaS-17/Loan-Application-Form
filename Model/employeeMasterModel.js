import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    employeeName: { type: String, required: true },
    officialEmail: { type: String, required: true, unique: true },
    officeMobile: { type: String },
    reportingTo: { type: String },
    dateOfJoining: { type: Date, required: true },
    panNo: { type: String, unique: true },
    pfNo: { type: String, unique: true },
    esiNo: { type: String },
    monthlyTarget: { type: Number },

    isActive: {
      type: Boolean,
      default: false, // 🔹 Default to Active
    },

    emergencyContact: {
      name: { type: String },
      mobile: { type: String },
      relation: { type: String },
    },
    personalDetails: {
      mobileNo: { type: String, required: true },
      email: { type: String, required: true },
      whatsappNo: { type: String },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
      },
      aadharNo: { type: String, unique: true },
      dateOfBirth: { type: Date },
      dateOfAnniversary: { type: Date },
      maritalStatus: {
        type: String,
        enum: ["Single", "Married"],
        required: true,
      },
      education: { type: String },
      bankAccount: {
        name: { type: String },
        number: { type: String },
      },
    },
    address: {
      current: {
        address: { type: String },
        state: { type: String },
        city: { type: String },
        pincode: { type: String },
      },
      permanent: {
        address: { type: String },
        state: { type: String },
        city: { type: String },
        pincode: { type: String },
      },
    },
    incentiveDetails: {
      isEligible: { type: Boolean, default: false },
    },
    targetDetails: {
      isAssigned: { type: Boolean, default: false },
    },
    authentication: {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: true,
      },
      branch: { type: String },
    },
    photo: { type: String }, // Store photo as a URL or base64
    sameAsCurrent: { type: Boolean, default: false }, // For syncing current and permanent address
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving
employeeSchema.pre("save", async function (next) {
  if (this.isModified("authentication.password")) {
    this.authentication.password = await bcrypt.hash(
      this.authentication.password,
      10
    );
  }
  next();
});

// Method to compare password for login
employeeSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.authentication.password);
};
// Method to generate JWT token (if needed in the future)
employeeSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.authentication.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// Optional: Index the email fields for faster search
// employeeSchema.index({ 'authentication.email': 1 });
// employeeSchema.index({ 'employeeId': 1 });

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
