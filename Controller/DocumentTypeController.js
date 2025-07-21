import DocumentType from "../Model/DocumentTypeModel.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// Create Document Type
const createDocumentType = async (req, res) => {
  try {
    const { name } = req.body;
    const newDocumentType = new DocumentType({ name });
    await newDocumentType.save();

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { newDocumentType },
          "Document type created successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          `Error creating document type: ${err.message}`
        )
      );
  }
};

// Get All Document Types
const getAllDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await DocumentType.find();
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          documentTypes,
          "Document types fetched successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          `Error fetching document types: ${err.message}`
        )
      );
  }
};

// Get Document Type by ID
const getDocumentTypeById = async (req, res) => {
  try {
    const documentType = await DocumentType.findById(req.params.id);
    if (!documentType) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Document type not found"));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, documentType, "Document type fetched successfully")
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          `Error fetching document type: ${err.message}`
        )
      );
  }
};

// Update Document Type
const updateDocumentType = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedDocumentType = await DocumentType.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updatedDocumentType) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Document type not found for update"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedDocumentType,
          "Document type updated successfully"
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          `Error updating document type: ${err.message}`
        )
      );
  }
};

// Delete Document Type
const deleteDocumentType = async (req, res) => {
  try {
    const deletedDocumentType = await DocumentType.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDocumentType) {
      return res
        .status(404)
        .json(
          new ApiResponse(404, null, "Document type not found for deletion")
        );
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Document type deleted successfully"));
  } catch (err) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          `Error deleting document type: ${err.message}`
        )
      );
  }
};

export {
  createDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById,
  updateDocumentType,
  deleteDocumentType,
};
