const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ err: "Not authenticated" });
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err: err.message });
  }

  if (!decodedToken) {
    return res
      .status(401)
      .json({ err: "Not Authenticated" });
  }

  req.user = decodedToken;
  next();
};
