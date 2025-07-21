import Offer from "../Model/offerModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

const createOffer = asyncHandler(async (req, res) => {
  try {
    const {
      bankName,
      offerTitle,
      shortDescription,
      discount,
      processingFee,
      houslyCashback,
      validTill,
    } = req.body;

    if (
      !bankName ||
      !offerTitle ||
      !shortDescription ||
      !discount ||
      !processingFee ||
      !houslyCashback ||
      !validTill
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const offer = new Offer({
      bankName,
      offerTitle,
      shortDescription,
      discount,
      processingFee,
      houslyCashback,
      validTill,
    });

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (!result) {
        throw new ApiError(400, "Image upload failed");
      }
      offer.coverImg = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    await offer.save();

    return res
      .status(201)
      .json(new ApiResponse(201, offer, "Offer created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Failed to create the offer");
  }
});

const getAllOffers = asyncHandler(async (req, res) => {
  try {
    const allOffers = await Offer.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, allOffers, "Offers fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Failed to fetch offers");
  }
});

const getOfferById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById(id);

    if (!offer) {
      throw new ApiError(404, "Offer does not exist");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, offer, "Offer fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Failed to fetch the offer");
  }
});

const updateOffer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bankName,
      offerTitle,
      shortDescription,
      discount,
      processingFee,
      houslyCashback,
      validTill,
    } = req.body;

    const updateData = {
      bankName,
      offerTitle,
      shortDescription,
      discount,
      processingFee,
      houslyCashback,
      validTill,
    };

    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (!result) {
        throw new ApiError(400, "Image upload failed");
      }

      updateData.coverImg = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    const updatedOffer = await Offer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOffer) {
      throw new ApiError(404, "Offer not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedOffer, "Offer updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Failed to update the offer");
  }
});

const deleteOffer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      throw new ApiError(404, "Offer not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Offer deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error.message || "Failed to delete the offer");
  }
});

export { createOffer, getAllOffers, getOfferById, updateOffer, deleteOffer };
