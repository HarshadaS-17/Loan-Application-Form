import mongoose from "mongoose";

const whatsappTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WhatsAppTemplate = mongoose.model(
  "WhatsAppTemplate",
  whatsappTemplateSchema
);
export default WhatsAppTemplate;
