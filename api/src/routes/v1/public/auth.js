const express = require("express");
const publicRouter = express.Router();
const publicController = require("@controller/public/auth");
const { publicValidator, validate } = require("@src/middleware/validator");

publicRouter.get("/list", publicController.dataList);
publicRouter.post(
  "/auth/register",
  publicValidator.register,
  validate,
  publicController.register
);
publicRouter.post(
  "/auth/login",
  publicValidator.login,
  validate,
  publicController.login
);

module.exports = publicRouter;
