const asyncWrapper = require("@asyncWrapper");
const config = require("@src/config");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const user = require("@src/models/user");
const jwt = require("jsonwebtoken");

const publicController = {
  dataList: asyncWrapper(async (req, res) => {
    const reqList = await axios.get(config.meroshare.bankList);
    const resList = await reqList.data;
    res.json({
      ok: true,
      code: 200,
      data: resList,
    });
  }),
  register: asyncWrapper(async (req, res) => {
    const { fullName, email, password } = req.body;
    const email_exist_check = await user.findOne({ email: email });
    if (email_exist_check) {
      res.statusCode = 400;
      res.message = "Email already exists";
      throw new Error("Error");
    }
    const genSalt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, genSalt);
    const createUser = await user.create({
      fullName,
      email,
      password: newPassword,
    });
    const newUser = createUser.toObject();
    newUser.password = "undefined";
    delete newUser.password;
    res.json({
      ok: true,
      data: newUser,
      message: "User registered successfully",
    });
  }),
  login: asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const check_email_exist = await user.findOne({ email: email });
    if (!check_email_exist) {
      res.statusCode = 404;
      res.message = "Account not found !!";
      throw new Error();
    }
    const check_password = check_email_exist.password;
    const compare_password = bcrypt.compareSync(password, check_password);
    if (!compare_password) {
      res.statusCode = 400;
      res.message = "Password not matched !!";
      throw new Error();
    }
    const loggedUser = check_email_exist.toObject();
    loggedUser.password = "undefined";
    delete loggedUser.password;
    const accessToken = jwt.sign({ id: loggedUser._id }, config.jwt.secret, {
      expiresIn: config.jwt.expiryDate,
    });
    res.json({
      ok: true,
      data: loggedUser,
      accessToken,
      message: "Logged in successfully",
    });
  }),
};

module.exports = publicController;
