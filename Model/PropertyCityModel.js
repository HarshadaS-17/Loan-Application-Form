// models/PropertyCity.js
import mongoose from "mongoose";

const propertyCitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PropertyCity = mongoose.model("PropertyCity", propertyCitySchema);

export default PropertyCity;
