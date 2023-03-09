const express = require("express");
const jwt = require("jsonwebtoken");
const {
  refreshTokenBodyValidation,
} = require("../utils/validationSchema");

const {
  verifyRefreshToken,
} = require("../utils/verifyRefreshToken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = refreshTokenBodyValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message });
  }

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails_id };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "14m" },
      );

      res.statusCode(200).json({
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
});

router.delete("/", async (req, res) => {
  try {
    const { error } = refreshTokenBodyValidation(req.body);

    if (error) {
      return res
        .status(400)
        .json({ err: error.details[0].message });
    }

    const userToken = await UserToken.findOne({
      token: req.body.refreshToken,
    });
    if (!userToken) {
      return res
        .status(200)
        .json({ message: "Logged Out Successfully" });
    }

    await userToken.remove();
    res
      .status(200)
      .json({ message: "Logged Out Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
