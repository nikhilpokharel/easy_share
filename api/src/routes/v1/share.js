const express = require("express");
const shareRouter = express.Router();

const shareController = require("@controller/v1/share");

shareRouter.get("/info", shareController.details);
shareRouter.post("/portfolio", shareController.portfolio);
shareRouter.post("/asba", shareController.myAsba);
shareRouter.post("/application_report", shareController.applicationReport);

module.exports = shareRouter;
