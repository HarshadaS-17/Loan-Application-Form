import OurPartner from "../Model/ourPartnerModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

// ➤ Add OurPartner Item
const addOurPartnerItem = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      throw new ApiError(400, "Title is required");
    }

    const newPartner = new OurPartner({ title });

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (!result) throw new ApiError(400, "Image upload failed");

      newPartner.coverImg = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    await newPartner.save();
    res.status(201).json(new ApiResponse(201, newPartner, "Our Partner created successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Get All OurPartner Items
const getOurPartnerItems = asyncHandler(async (req, res) => {
  try {
    const items = await OurPartner.find({});
    if (!items.length) throw new ApiError(404, "No OurPartner items found");

    res.status(200).json(new ApiResponse(200, items, "Our Partner items fetched successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Update OurPartner Item
const updateOurPartnerItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const partner = await OurPartner.findById(id);
    if (!partner) throw new ApiError(404, "Item not found");

    if (title) partner.title = title;

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (!result) throw new ApiError(400, "Image upload failed");

      partner.coverImg = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    await partner.save();
    res.status(200).json(new ApiResponse(200, partner, "Our Partner item updated successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Delete OurPartner Item
const deleteOurPartnerItem = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OurPartner.findByIdAndDelete(id);

    if (!deleted) throw new ApiError(404, "Our Partner item not found");

    res.status(200).json(new ApiResponse(200, deleted, "Our Partner item deleted successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  addOurPartnerItem,
  getOurPartnerItems,
  updateOurPartnerItem,
  deleteOurPartnerItem,
};
