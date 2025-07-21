import Blog from "../Model/BlogsModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// ➤ Add Blog Post
const addBlog = asyncHandler(async (req, res) => {
  const { title, shortDescription, author } = req.body;
  if (!title || !shortDescription || !author) {
    throw new ApiError(
      400,
      "Please provide title, shortDescription, and author"
    );
  }

  const newBlog = new Blog({ title, shortDescription, author });

  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) throw new ApiError(400, "Failed to upload the image");

    newBlog.coverImg = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  await newBlog.save();
  res
    .status(201)
    .json(new ApiResponse(201, newBlog, "Blog created successfully"));
});

// ➤ Get All Blog Posts
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  if (!blogs.length) throw new ApiError(404, "No blogs found");

  res.status(200).json(new ApiResponse(200, blogs, "All blogs fetched"));
});

// ➤ Update Blog Post
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) throw new ApiError(400, "Failed to upload the image");

    updatedData.coverImg = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedBlog) throw new ApiError(404, "Blog not found");

  res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

// ➤ Delete Blog Post
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);
  if (!deletedBlog) throw new ApiError(404, "Blog not found");

  res
    .status(200)
    .json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
});

export { addBlog, getBlogs, updateBlog, deleteBlog };
