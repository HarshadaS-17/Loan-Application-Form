import { Schema, model } from "mongoose";

const OurPartnerSchema = new Schema({
title: { type: String, required: true },
  coverImg: {
    public_id: { type: String, default: "" },
    secure_url: { type: String, default: "" },
  },
  
})

const OurPartner = model("OurPartner", OurPartnerSchema);
export default OurPartner; // ✅ Correct Default Export
