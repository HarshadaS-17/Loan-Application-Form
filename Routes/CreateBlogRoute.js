import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../Controller/CreateBlogController.js";
import upload from "../Middleware/multerMiddle.js";

const router = express.Router();

// Create and Get All Blogs
router.post("/create-blog", upload.single("coverImg"), createBlog);
router.get("/get-all-blogs", getBlogs);
// Get, Update, Delete Blog by ID
router.get("/get-blog/:id", getBlogById);
router.put("/update-blog/:id", upload.single("coverImg"), updateBlog);
router.delete("/delete-blog/:id", deleteBlog);

export default router;
