const express = require("express")
const router = express.Router()
const metoadminn = require("../model/sedntoadmin")
const nodemailer = require('nodemailer');
const getEmailMessage = require('../utils/mailtampalet')
router.get("/emailtouser/:id",async(req,res)=>{
    const userid = req.params.id
    const allmess = await metoadminn.findById(userid)
    const succes = req.query.success 
    res.render("sendmail",{allmessage:allmess ,success:succes})
})
router.post("/send-email/:id",async(req,res)=>{
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
        html: getEmailMessage(message)
      }
  
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully.')
  
    res.redirect(`/emailtouser/${req.params.id}?success=✅ Your response has been successfully sent to the user.`);
})
module.exports = router
