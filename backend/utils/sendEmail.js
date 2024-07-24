const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const sendEmail = async (options) => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      service: process.env.SMPT_SERVICE,
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent.");
  }
};

module.exports = sendEmail;
