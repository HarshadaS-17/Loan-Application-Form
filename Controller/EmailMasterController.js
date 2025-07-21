import EmailTemplate from "../Model/EmailMasterModel.js";

// ✅ Create

export const createTemplate = async (req, res) => {
  try {
    const { templateName, subject, body } = req.body;
    const newTemplate = new EmailTemplate({ templateName, subject, body });
    await newTemplate.save();
    res.status(201).json({
      message: "Email template created successfully",
      data: newTemplate,

    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating email template",
      error: error.message,
    });
  }
};
// ✅ Read All
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await EmailTemplate.find().sort({ createdAt: -1 });
    res.json({
      message: "Templates fetched successfully",
      data:templates,
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Read One
export const getTemplateById = async (req, res) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { templateName, subject, body } = req.body;
    const updated = await EmailTemplate.findByIdAndUpdate(
      id,
      
      { templateName, subject, body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "template not found" })
    }
    res.status(200).json({
      message: "Template updated successfully",
      data:updated,
    })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete
export const deleteTemplate = async (req, res) => {
  try {
    const template = await EmailTemplate.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }
    res.json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
