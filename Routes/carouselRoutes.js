import { Router } from "express";
import {
  createCarousel,
  getAllCarousel,
  updateCarousel,
  deleteCarousel
} from "../Controller/carouselController.js";
import upload from "../Middleware/multerMiddle.js";

const router = Router();

router.route("/create-carousel").post(upload.single("coverImg"), createCarousel);
router.route("/get-all-carousel").get(getAllCarousel);
router.route("/update-carousel/:id").put(updateCarousel);
router.route("/delete-carousel/:id").delete(deleteCarousel);

export default router;
