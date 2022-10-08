const { body } = require("express-validator");

const publicValidator = {
  login: [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 characters long"),
  ],
  register: [
    body("fullName")
      .not()
      .isEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 4 })
      .withMessage("Fullname must be atleast 4 characters long"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 characters long"),
  ],
};

module.exports = publicValidator;
