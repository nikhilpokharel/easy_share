const express = require("express");
const publicRouter = express.Router();
const authRouter = require("@routes/v1/public/auth");

publicRouter.use(authRouter);

module.exports = publicRouter;
