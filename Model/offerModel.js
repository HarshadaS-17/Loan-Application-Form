import { Schema, model } from "mongoose";

const offerSchema = new Schema(
  {
    bankName: {
      type: String,
      required: [true, "Bank Name is required"],
      trim: true,
    },
    offerTitle: {
      type: String,
      required: [true, "Offer Title is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short Description is required"],
      trim: true,
    },
    discount: {
      type: String,
      required: [true, "Discount is required"],
      trim: true,
    },
    processingFee: {
      type: String,
      required: [true, "Processing Fee is required"],
      trim: true,
    },
    houslyCashback: {
      type: String,
      required: [true, "Hously Cashback is required"],
      trim: true,
    },
    validTill: {
      type: Date,
      required: [true, "Valid Till date is required"],
    },

    // ✅ New Image Field for Cloudinary Upload
    coverImg: {
      public_id: {
        type: String,
        default: "",
      },
      secure_url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Offer = model("Offer", offerSchema);

export default Offer;
