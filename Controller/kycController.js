import axios from "axios";
import KYC from "../Model/kycModel.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const verifyKYC = asyncHandler(async (req, res) => {
  const data = req.body;
  try {
    // const response = await axios.post(
    //   "https://kyc-api-provider.com/verify",
    //   req.body,
    //   {
    //     headers: { Authorization: `Bearer ${process.env.KYC_API_KEY}` },
    //   }
    // );

    // if (response.data.success) {
    // }

    const KYCclaim = await KYC.create(data);
    return res.status(200).json({
      success: true,
      data: KYCclaim,
      message: "KYC claim successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const updateKYCStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const kycClaim = await KYC.findById(id);
    if (!kycClaim) return res.status(404).json({ message: "KYC not found" });


    const updatedKYC = await KYC.findByIdAndUpdate(
      id,
      { $set: { status } },
      {
        new: true,
      }
    );
    if (!updatedKYC)
      return res.status(404).json({ message: "Failed to update a KYC" });

    return res.status(200).json({
      success: true,
      data: updatedKYC,
      message: "KYC updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update" || error.message });
  }
});

export { verifyKYC, updateKYCStatus };
