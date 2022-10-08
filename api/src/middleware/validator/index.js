const publicValidator = require("@src/middleware/validator/public");
const userValidator = require("@src/middleware/validator/user");

const { validationResult } = require("express-validator");

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }
  const message = errors.array()[0].msg;
  res.status(422).json({
    ok: false,
    message: message,
    data: [],
  });
}

module.exports = {
  publicValidator,
  userValidator,
  validate,
};
