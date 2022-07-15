const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "busride27@outlook.com",
    pass: "Skywalk@(7",
  },
});
const mailOptions = {
  from: "busride27@outlook.com",
  to: "kshitijg5@gmail.com",
  text: `Please Verify your email address using this url ${this.url}`,
};
transporter.sendMail(mailOptions);
