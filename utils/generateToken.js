const jwt = require("jsonwebtoken");
const UserToken = require("../modals/userToken");

module.exports.generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, user: user };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "1d" },
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" },
    );

    const userToken = await UserToken.findOne({
      userId: user._id,
    });

    if (userToken) await userToken.remove();
    await new UserToken({
      userId: user._id,
      user: user,
      token: refreshToken,
    }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    console.log(err.message);
    return Promise.reject(err);
  }
};
