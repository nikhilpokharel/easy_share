const config = require("@src/config");
const mongoose = require("mongoose");

mongoose
  .connect(config.db.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected !");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error connection mongodb");
  });
