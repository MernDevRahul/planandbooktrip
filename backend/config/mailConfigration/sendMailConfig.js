const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Change this to your actual SMTP host
  port: 465, // Use 465 for SSL
  secure: true, // Set this to true because you're using port 465 (SSL)
  auth: {
    user: "contact@planandbooktrip.com", // Your email address
    pass: "2$|kV1S@o", // Your email password
  },
  tls: {
    rejectUnauthorized: true, // This helps bypass SSL certificate issues
  },
  // Enable debug output
});

const sendMailController = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    // console.error("Error sending email:", error);
  }
};

module.exports = sendMailController; 