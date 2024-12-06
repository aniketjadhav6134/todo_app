import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure : true,
  port : 465,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD, 
  },
});

const sendMail = async (recipientEmail, subject, message) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to: recipientEmail, 
    subject: subject,  
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
        console.error('Error sending email:', error);
  }
};

export default sendMail;
