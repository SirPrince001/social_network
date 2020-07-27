const nodemailer = require("nodemailer");
require("dotenv").config();

async function mailer(to,subject,text) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { 
                user: process.env.user,
                pass: process.env.password 
            },
          });
        
          let info = await transporter.sendMail({
            from: `${process.env.app_name} <${process.env.user}>`,
            to,
            subject, 
            text,
          });
          console.log("Message Sent %s :", info);
        
    
}

module.exports = mailer;

