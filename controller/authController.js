const bcrypt = require("bcrypt");
const User = require("../modals/user");
const {
  generateTokens,
} = require("../utils/generateToken");

const {
  signUpBodyValidation,
  loginBodyValidation,
} = require("../utils/validationSchema");

module.exports.getUser = async (req, res) => {
  try {
    const email = req.user.user.email;

    const user = await User.findOne({ email });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

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

    const phone = await User.findOne({
      phone: +req.body.phone,
    });

    if (user) {
      return res
        .status(400)
        .json({ err: "User already exists" });
    }

    if (phone) {
      return res
        .status(400)
        .json({ err: "Phone number already exists" });
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

module.exports.updateUser = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    state,
    city,
    street,
    zipcode,
  } = req.body;

  const email = req.user.user.email;

  try {
    const user = await User.findOne({ email });

    user.firstname = firstname;
    user.lastname = lastname;
    user.phone = phone;
    user.shippingAddress = {
      state,
      city,
      street,
      zipcode,
    };

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } =
    req.body;
  const email = req.user.user.email;
  try {
    const user = await User.findOne({ email });

    const verifiedPassword = await bcrypt.compare(
      oldPassword,
      user.password,
    );

    if (!verifiedPassword) {
      return res
        .status(401)
        .json({ err: "Invalid password" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(401)
        .json({ err: "password mismatch" });
    }

    const salt = await bcrypt.genSalt(
      Number(process.env.SALT),
    );

    const hashPassword = await bcrypt.hash(
      newPassword,
      salt,
    );

    user.password = hashPassword;
    console.log(hashPassword);

    await user.save();

    res
      .status(200)
      .json({ message: "password updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateEmail = async (req, res) => {
  const email = req.user.user.email;
  const newemail = req.body.email;
  try {
    const user = await User.findOne({ email });

    user.email = newemail;

    await user.save();

    res
      .status(200)
      .json({ message: "email updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports.updateForgettenPassword = async (
  req,
  res,
) => {
  const { email, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ err: "user is not existed" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(401)
        .json({ err: "password mismatched" });
    }
    const salt = await bcrypt.genSalt(
      Number(process.env.SALT),
    );

    const hashPassword = await bcrypt.hash(
      newPassword,
      salt,
    );

    user.password = hashPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "password updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
