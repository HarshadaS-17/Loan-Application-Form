import { Router } from "express";
import {
    addHappyItem,
    deleteHappyItem,
    updateHappyItem,
    getHappyItems,
} from "../Controller/happySectionController.js";
import upload from "../Middleware/multerMiddle.js";

const router = Router();
router.route("/create-happy").post(upload.single("coverImg"), addHappyItem);
router.route("/get-all-happy").get(getHappyItems);
router.route("/update-happy/:id").put(upload.single("coverImg"), updateHappyItem);
router.route("/delete-happy/:id").delete(deleteHappyItem);

export default router;
