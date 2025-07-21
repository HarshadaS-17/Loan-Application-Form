import Happy from "../Model/happyModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// ➤ Add Happy Item
const addHappyItem = asyncHandler(async (req, res) => {
  const { title, shortDescription } = req.body;
  if (!title || !shortDescription) {
    throw new ApiError(400, "Please provide all fields");
  }

  const newHappy = new Happy({ title, shortDescription });

  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    if (!result) throw new ApiError(400, "Failed to upload the image");

    newHappy.coverImg = {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  }

  await newHappy.save();
  res.status(201).json(new ApiResponse(201, newHappy, "Happy section created successfully"));
});

// ➤ Get All Happy Items
const getHappyItems = asyncHandler(async (req, res) => {
  const items = await Happy.find();
  if (!items.length) throw new ApiError(404, "No happy items found");

  res.status(200).json(new ApiResponse(200, items, "All happy items fetched"));
});

// ➤ Update Happy Item
const updateHappyItem = asyncHandler(async (req, res) => {
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

  const updatedHappy = await Happy.findByIdAndUpdate(id, updatedData, { new: true });
  if (!updatedHappy) throw new ApiError(404, "Item not found");

  res.status(200).json(new ApiResponse(200, updatedHappy, "Happy item updated successfully"));
});

// ➤ Delete Happy Item
const deleteHappyItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Happy.findByIdAndDelete(id);
  if (!deletedItem) throw new ApiError(404, "Item not found");

  res.status(200).json(new ApiResponse(200, deletedItem, "Happy item deleted successfully"));
});

export { addHappyItem, getHappyItems, updateHappyItem, deleteHappyItem };