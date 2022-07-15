const nodemailer = require("nodemailer");
const path = require("path");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(" ")[0];
    this.url = url;
    this.from = process.env.EMAIL_FROM;
  }

  // newTransporter() {
  //   return nodemailer.createTransport({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });
  // }

  // REAL EMAILS
  newTransporter() {
    return nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_SEND_MAIL,
        pass: process.env.EMAIL_SEND_PASSWORD,
      },
    });
  }

  async send(subject) {
    const html = pug.renderFile(path.join(__dirname, "..", "views", "verifyUser"), { url: this.url });
    const mailOptions = {
      from: process.env.EMAIL_SEND_MAIL,
      to: this.to,
      subject,
      text: htmlToText(html),
    };
    await this.newTransporter().sendMail(mailOptions);
  }
}

module.exports = Email;
