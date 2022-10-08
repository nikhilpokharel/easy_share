const express = require("express");
const userRouter = express.Router();
const { userValidator, validate } = require("@src/middleware/validator");
const userController = require("@controller/v1/user");

userRouter.get("/accounts", userController.getAccounts);
userRouter.get("/profile", userController.profile);
userRouter.post(
  "/account",
  userValidator.createAccount,
  validate,
  userController.createAccount
);
userRouter.put(
  "/account/:id",
  userValidator.updateAccount,
  validate,
  userController.updateAccount
);
userRouter.patch(
  "/account/password/:id",
  userValidator.updateAccountPassword,
  validate,
  userController.updateAccountPassword
);
userRouter.delete(
  "/account/:id",
  userValidator.deleteAccount,
  validate,
  userController.deleteAccount
);

module.exports = userRouter;
