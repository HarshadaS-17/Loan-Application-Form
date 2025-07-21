import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Bank name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Bank address is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  branch: {
    type: String,
    required: [true, "Branch is required"],
    trim: true,
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"],
    match: [/^\d{6}$/, "Pincode must be 6 digits"],
  },
  bankers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banker",
    },
  ],
  products: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Product",
    // },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
bankSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;




//kamlesh