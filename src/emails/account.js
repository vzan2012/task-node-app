const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      subject: "Thanks for joining in",
      from: "vzan2012@outlook.com",
      to: email,
      text: `Welcome to the app, ${name}. Go along with the app`,
    })
    .then(() => console.log("Welcome Email Sent"))
    .catch((error) => console.log(error));
};

const sendCancelationEmail = (email, name) => {
  sgMail
    .send({
      subject: "User Account Removed",
      from: "vzan2012@outlook.com",
      to: email,
      text: `Good Bye, ${name}. We hope to see you back sometime soon.`,
    })
    .then(() => console.log("UserAccount Removed Email Sent"))
    .catch((error) => console.log(error));
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
