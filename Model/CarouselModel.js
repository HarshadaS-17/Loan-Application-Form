import { Schema, model } from "mongoose";

const carouselSchema = new Schema({
  offerTitle: {
    type: String,
    required: true,
  },
  category: {
    // Fixed the spelling here
    type: String,
    enum: ["homeLoan", "propertyLoan", "loanAgainstProperty"],
    default: "",
  },
  shortDescription: {
    type: String,
    required: true,
  },
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
});

const Carousel = model("Carousel", carouselSchema);
export default Carousel;
