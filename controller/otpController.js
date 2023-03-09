const generator = require("generate-password");

const OTP = require("../modals/otp");
const { sendPasswordMail } = require("../utils/sendMails");

module.exports.getOTP = async (req, res) => {
  const id = req.params.id;
  try {
    const otp = await OTP.findById(id);

    res.status(200).json(otp);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

module.exports.createOTP = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ err: "Invalid Details" });
    }
    const token = generator.generate({
      length: 6,
      numbers: true,
    });

    const otp = new OTP({
      email,
      token,
    });

    sendPasswordMail(req.body.email, token);

    await otp.save();

    res.status(200).json(otp);
  } catch (e) {
    res.status(500).json({ err: err.message });
  }
};