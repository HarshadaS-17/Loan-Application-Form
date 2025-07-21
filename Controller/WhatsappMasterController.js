import WhatsAppTemplate from "../Model/WhatsappMasterModel.js";

// CREATE Template
export const createTemplate = async (req, res) => {
  try {
    const { templateName, body } = req.body;

    const newTemplate = new WhatsAppTemplate({ templateName, body });
    await newTemplate.save();

    res.status(201).json({
      message: "Template created successfully",
      data: newTemplate,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating template",
      error: error.message,
    });
  }
};

// GET All Templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await WhatsAppTemplate.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Templates fetched successfully",
      data: templates,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching templates",
      error: error.message,
    });
  }
};

// UPDATE Template
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { templateName, body } = req.body;

    const updated = await WhatsAppTemplate.findByIdAndUpdate(
      id,
      { templateName, body },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({
      message: "Template updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating template",
      error: error.message,
    });
  }
};

// DELETE Template
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await WhatsAppTemplate.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({
      message: "Template deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting template",
      error: error.message,
    });
  }
};
