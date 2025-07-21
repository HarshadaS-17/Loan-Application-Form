import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true only if using port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Must be the App Password
  },
});

async function sendEmailUtil(to, subject, text) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error) {
    console.error("Email sending error:", error);
  }
}

export default sendEmailUtil;
