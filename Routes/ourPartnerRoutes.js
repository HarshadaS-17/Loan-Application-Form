import { Router } from "express";
import { addOurPartnerItem, deleteOurPartnerItem, getOurPartnerItems, updateOurPartnerItem } from "../Controller/ourPartnerController.js";
import upload from "../Middleware/multerMiddle.js";

const router = Router();
router.route("/create-ourpartner").post(upload.single("coverImg"), addOurPartnerItem);
router.route("/get-all-ourpartner").get(getOurPartnerItems);
router.route("/update-ourpartner/:id").put(upload.single("coverImg"), updateOurPartnerItem);
router.route("/delete-ourpartner/:id").delete(deleteOurPartnerItem);

export default router;
