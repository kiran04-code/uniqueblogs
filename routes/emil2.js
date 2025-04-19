const express = require("express")
const Router = express.Router()
const user = require('../model/user')
const nodemailer = require('nodemailer');
const  getEmailMessageForIndividualUser = require("../utils/mailtoone")
Router.get("/emailtpericularuser",async(req,res)=>{
    const users =  await user.find({})
    const succes = req.query.success 
    res.render("mailtouserone",{userz:users,success:succes})
})
Router.post("/sendemailtoone",async(req,res)=>{
    const {email,subject,message} = req.body
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'uniqueblogcom@gmail.com',
          pass: 'ruvn zkew rktw qvpb'
        }
      })
  
      const mailOptions = {
        from: 'uniqueblogcom@gmail.com',
        to: email,
        subject: subject,
        html: getEmailMessageForIndividualUser(message)
      }
  
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully2.')
    res.redirect(`/emailtpericularuser/?success=✅ Your response has been successfully sent to the user.`);
})
module.exports = Router