const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

//sends a very simple email from a designated email to a designated email
router.post('/contact', (req,res)=>{
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_KEY,
  },
})

  const mailOptions = {
    from: process.env.NODEMAILER_FROM,
    to: process.env.NODEMAILER_TO,
    subject: `Message from ${req.body.email}`,
    text: `Name: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message} `
  }

  transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      console.log(error);
      res.send('error');
    } else{
      console.log('Email sent: ' + info.response)
      res.status(200).send('Request successful');
    }
  })
})

module.exports = router;