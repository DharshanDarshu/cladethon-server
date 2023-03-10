const bcrypt = require("bcrypt");
const User = require("../modals/user");
const {
  generateTokens,
} = require("../utils/generateToken");

const {
  signUpBodyValidation,
  loginBodyValidation,
} = require("../utils/validationSchema");

module.exports.signUp = async (req, res) => {
  try {
    const { error } = signUpBodyValidation(req.body);
    if (error) {
      return res
        .status(400)
        .json({ err: error.details[0].message });
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res
        .status(400)
        .json({ err: "User already exists" });
    }

    const salt = await bcrypt.genSalt(
      Number(process.env.SALT),
    );

    const hashPasword = await bcrypt.hash(
      req.body.password,
      salt,
    );

    const newUser = new User({
      ...req.body,
      password: hashPasword,
    });

    await newUser.save();

    res.status(200).json({
      user: newUser,
      message: "Account created successfully",
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { error } = loginBodyValidation(req.body);

    if (error) {
      return res
        .status(400)
        .json({ err: error.details[0].message });
    }

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(401)
        .json({ err: "Invalid email or password" });
    }

    req.session.user = user;
    console.log(user);

    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!verifiedPassword) {
      return res
        .status(401)
        .json({ err: "Invalid email or password" });
    }

    // generate access and refresh token
    const { accessToken, refreshToken } =
      await generateTokens(user);

    res.status(200).json({
      accessToken,
      refreshToken,
      user,
      message: "Logged in Successfully",
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
