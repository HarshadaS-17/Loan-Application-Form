import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
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
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model("Blog", blogSchema);
