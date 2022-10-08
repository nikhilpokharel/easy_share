require("module-alias/register.js");
require("@src/database");
const express = require("express");
const config = require("@src/config");
const mainRouter = require("@src/routes");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const originRegex = new RegExp(config.app.originRegex);
const allowedOrigins = config.app.allowedOrigins.split(",");
const corsOption = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }
    if (allowedOrigins.indexOf(origin) !== -1 || originRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOption));
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api", mainRouter);
app.listen(config.app.port, () => {
  console.log("server is running at port " + config.app.port);
});
