const express = require("express");
const { authMain, authShare } = require("@src/middleware/auth");
const v1 = express.Router();

//all required routes v1
const publicRouter = require("@routes/v1/public");
const userShareRouter = require("@routes/v1/share");
const userRouter = require("@routes/v1/user");

v1.use("/user", authMain, userRouter);
v1.use("/user/share", authMain, authShare, userShareRouter);
v1.use(publicRouter);

module.exports = v1;
