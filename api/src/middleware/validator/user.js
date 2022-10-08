const { body, param } = require("express-validator");

const userValidator = {
  createAccount: [
    body("accountUser")
      .not()
      .isEmpty()
      .withMessage("Account user is required")
      .isLength({ min: 2 })
      .withMessage("Account user must be atleast 2 charaters long"),
    body("clientId")
      .not()
      .isEmpty()
      .withMessage("ClientID is required")
      .isNumeric()
      .withMessage("ClientID must be a number"),
    body("userName")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isNumeric()
      .withMessage("Username must be a number"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  updateAccount: [
    param("id").isMongoId().withMessage("Invalid AccountID"),
    body("accountUser")
      .not()
      .isEmpty()
      .withMessage("Account user is required")
      .isLength({ min: 2 })
      .withMessage("Account user must be atleast 2 charaters long"),
    body("clientId")
      .not()
      .isEmpty()
      .withMessage("ClientID is required")
      .isNumeric()
      .withMessage("ClientID must be a number"),
    body("userName")
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isNumeric()
      .withMessage("Username must be a number"),
  ],
  updateAccountPassword: [
    param("id").isMongoId().withMessage("Invalid AccountID"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  deleteAccount: [param("id").isMongoId().withMessage("Invalid AccountID")],
};

module.exports = userValidator;
