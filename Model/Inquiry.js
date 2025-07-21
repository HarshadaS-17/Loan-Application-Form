import { Schema, model } from "mongoose";

const inquirySchema = new Schema(
  {
    email: { type: String, required: true },
    subject: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

const Email = new model("Email", inquirySchema);

export default Email;
