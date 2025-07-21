import { Schema, model } from "mongoose";

const happySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  coverImg: {
    public_id: {
      type: String,
      default: ""
    },
    secure_url: {
      type: String,
      default: ""
    },
  },
});

export default model("Happy", happySchema);