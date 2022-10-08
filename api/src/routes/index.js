const express = require("express");
const mainRouter = express.Router();

const v1 = require("@routes/v1");

mainRouter.use("/v1", v1);

module.exports = mainRouter;
