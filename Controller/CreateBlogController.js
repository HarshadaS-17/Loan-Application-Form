import Blog from "../Model/CreateBlogModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// ➤ Create Blog Post
export const createBlog = asyncHandler(async (req, res) => {
  const { title, Categories, short_description, status, date, content } =
    req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const newBlog = new Blog({
    title,
    Categories,
    short_description,
    status,
    date,
    content,
  });

  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) throw new ApiError(400, "Failed to upload image");

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

// ➤ Get All Blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, blogs, "All blogs fetched"));
});

// ➤ Get Single Blog by ID
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  res.status(200).json(new ApiResponse(200, blog, "Single blog fetched"));
});

// ➤ Update Blog Post
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) throw new ApiError(400, "Failed to upload image");

    updatedData.coverImg = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) throw new ApiError(404, "Blog not found");

  res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

// ➤ Delete Blog Post
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) throw new ApiError(404, "Blog not found");

  res
    .status(200)
    .json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
});
