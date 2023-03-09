const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    validate: {
      validator: function (val) {
        return val.toString().length === 10;
      },
      message: (val) =>
        `${val.value} has to be 10 digits Number`,
    },
    required: true,
    unique: true,
  },
  confirmOTP: {
    type: String,
    expires: "2m",
  },
  shippingAddress: {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
