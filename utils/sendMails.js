const nodemailer = require("nodemailer");

module.exports.sendPasswordMail = (
  senderMail,
  token,
  name,
) => {
  let transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  // console.log(process.env.MAIL_USERNAME);

  let mailOptions = {
    from: "dharshankumar.as@zensar.com",
    to: senderMail,
    subject: "Zensar Ecommerce",
    text: `Hi \n
    here is your token \n
    token: ${token}
    `,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
