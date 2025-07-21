import Carousel from "../Model/CarouselModel.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { rm } from "fs";

// ➤ Add Carousel Data
const createCarousel = asyncHandler(async (req, res) => {
  try {
    const { offerTitle, shortDescription, category } = req.body;

    if (!offerTitle || !shortDescription || !category) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const createdOffer = new Carousel({
      offerTitle,
      shortDescription,
      category,
    });

    if (req.file) {
      try {
        const localPath = req?.file?.path;
        const result = await uploadOnCloudinary(localPath);

        if (!result) {
          throw new ApiError(400, "Failed to upload the img");
        }

        if (result) {
          createdOffer.coverImg.public_id = result.public_id;
          createdOffer.coverImg.secure_url = result.secure_url;
        }
      } catch (error) {
        throw new ApiError(400, "Failed to upload the img");
      }
    }

    await createdOffer.save();

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          createdOffer,
          "Carousel offer created successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Get All Carousel Data
const getAllCarousel = asyncHandler(async (req, res) => {
  try {
    const carouselItems = await Carousel.find({});
    if (!carouselItems.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, [], "No carousel items found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          carouselItems,
          "Carousel items fetched successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Update Carousel Data
const updateCarousel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { offerTitle, shortDescription, category } = req.body;

    const updatedOffer = await Carousel.findByIdAndUpdate(
      id,
      { offerTitle, shortDescription, category },
      { new: true }
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedOffer,
          "Carousel offer updated successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Delete Carousel Data
const deleteCarousel = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await Carousel.findByIdAndDelete(id);

    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          deletedOffer,
          "Carousel offer deleted successfully"
        )
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {
  createCarousel,
  getAllCarousel,
  updateCarousel,
  deleteCarousel
};
