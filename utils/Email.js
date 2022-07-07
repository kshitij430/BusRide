const nodemailer = require("nodemailer");
const path = require("path");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  newTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.to,
      subject,
      text: `Please Verify your email address using this url ${this.url}`,
    };
    await this.newTransporter().sendMail(mailOptions);
  }
}

module.exports = Email;
