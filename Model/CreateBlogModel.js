// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    Categories: { type: String, required: true },
    short_description: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    date: { type: Date, default: Date.now },
    // image_url: { type: String },
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
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("CreateBlog", blogSchema);
export default Blog;
