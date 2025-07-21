import { Router } from "express";
import {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../Controller/BlogsController.js";
import upload from "../Middleware/multerMiddle.js";

const router = Router();

router.route("/create-blog").post(upload.single("coverImg"), addBlog);
router.route("/get-all-blogs").get(getBlogs);
router.route("/update-blog/:id").put(upload.single("coverImg"), updateBlog);
router.route("/delete-blog/:id").delete(deleteBlog);

export default router;
