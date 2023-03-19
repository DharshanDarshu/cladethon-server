const mongoose = require("mongoose");

const userTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  user: {
    email: String,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 30 * 86400, // 30days
  },
});

const UserToken = mongoose.model(
  "UserToken",
  userTokenSchema,
);

module.exports = UserToken;
