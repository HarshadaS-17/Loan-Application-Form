import Email from "../Model/Inquiry.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import sendEmailUtil from "../Utils/nodemailerUtil.js";

const sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailTransporter = await sendEmailUtil(to, subject, text);

    const query = await Email.create({
      email: to,
      subject,
      text
    });

    const createdQuery = await Email.findById(query._id);;

    if (!createdQuery) {
      throw new ApiError(400, "Failed to save the query");
    }


    return res
      .status(200)
      .json(new ApiResponse(200, createdQuery,  "Email sent successfully"));
  } catch (error) {
    //   console.error("Email sending error:", error);
    throw new ApiError(
      400,
      error.message || "Something went wrong in generating tokens"
    );
  }
};

export { sendEmail };
