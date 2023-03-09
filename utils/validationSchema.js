const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

module.exports.signUpBodyValidation = (body) => {
  const schema = Joi.object({
    firstname: Joi.string().required().label("First Name"),
    lastname: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
    phone: Joi.number().required().label("Phone"),
    shippingAddress: Joi.required().label(
      "Shipping Address",
    ),
  });

  return schema.validate(body);
};

module.exports.loginBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(body);
};

module.exports.refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string()
      .required()
      .label("Refresh Token"),
  });

  return schema.validate(body);
};
