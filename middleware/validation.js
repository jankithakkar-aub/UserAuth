const { check, validationResult } = require("express-validator");

exports.validateUserRegistration = [
  check("username") 
    .isAlphanumeric()
    .withMessage(
      "Username must contain only alphabets and letters and without spaces"
    ),
  check("email").isEmail().withMessage("Not a valid email"),
];

exports.validateUserLogin = [
  check("username").notEmpty().withMessage("Username can't be blank"),
  check("email").notEmpty().withMessage("Email can't be blank").isEmail().withMessage("Not a valid email"),
];

exports.handleUserValidationErrors = (req, res, next) => {
  console.log("req.body from validation", req.body);
  const errors = validationResult(req); // This extracts the validation errors from a request and makes them available in a Result object
  console.log("errors from validation", errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array }); // This returns an array of all the errors in the request
  }
  next();
};
