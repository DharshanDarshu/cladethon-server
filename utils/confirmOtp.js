const { Auth } = require("two-step-auth");

async function confirmOTP(emailId) {
  try {
    console.log(emailId);
    const res = await Auth(emailId);
    // You can follow this approach,
    // but the second approach is suggested,
    // as the mails will be treated as important
    //   const res = await Auth(emailId, "Company Name");
    console.log(res);
    console.log(res.mail);
    console.log(res.OTP);
    console.log(res.success);
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = confirmOTP;
