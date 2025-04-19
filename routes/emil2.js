const express = require("express");
const Router = express.Router();
const user = require('../model/user');
const nodemailer = require('nodemailer');
const getEmailMessageForIndividualUser = require("../utils/mailtoone");

Router.get("/emailtoparticularuser", async (req, res) => {
  try {
    const users = await user.find({});
    const success = req.query.success;
    res.render("mailtouserone", { userz: users, success: success });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).send("Server error");
  }
});

Router.post("/sendemailtoone", async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    console.log("Form data:", req.body); // Debugging

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'uniqueblogcom@gmail.com',
        pass: process.env.Email_Api_key // 🔐 Replace with env var in production
        // pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: 'uniqueblogcom@gmail.com',
      to: email,
      subject: subject,
      html: getEmailMessageForIndividualUser(message)
      // Or use plain text for testing:
      // text: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");

    res.redirect(`/emailtoparticularuser/?success=✅ Your response has been successfully sent to the user.`);
  } catch (error) {
    console.error("Email sending failed:", error);
    res.redirect(`/emailtoparticularuser/?success=❌ Failed to send email. Please try again.`);
  }
});

module.exports = Router;
