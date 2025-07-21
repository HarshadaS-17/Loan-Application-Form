import mongoose from "mongoose";

const propertyStateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "State name is required"],
      trim: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const PropertyState = mongoose.model("PropertyState", propertyStateSchema);
export default PropertyState;
