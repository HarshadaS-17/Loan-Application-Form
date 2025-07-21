import mongoose from "mongoose";

// Define your permissions list based on enum values
const permissionsList = [
  "create_enquiry",
  "edit_enquiry",
  "view_enquiry",
  "delete_enquiry",
  "create_user",
  "edit_user",
  "view_user",
  "delete_user",
  "create_role",
  "edit_role",
  "view_role",
  "delete_role",
  "edit_loan_lead",
  "create_loan_lead",
  "delete_loan_lead",
  "view_loan_lead",
];

// Build permissions schema dynamically
const permissionsSchema = {};
permissionsList.forEach((perm) => {
  permissionsSchema[perm] = { type: Boolean, default: false };
});

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    permissions: {
      type: new mongoose.Schema(permissionsSchema, { _id: false }),
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
