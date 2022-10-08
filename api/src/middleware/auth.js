const asyncAuthWrapper = require("@asyncAuthWrapper");
const config = require("@src/config");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const user = require("@src/models/user");
const accounts = require("@src/models/accounts");
const { decryptText } = require("@src/helper/crypto");
const mongoose = require("mongoose");

const authControllerUser = asyncAuthWrapper(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.statusCode = 403;
    res.statusText = "Unauthorized_User";
    throw new Error("Unauthorized user !");
  }
  const token = authorization.split(" ")[1];
  const decode = jwt.verify(token, config.jwt.secret);
  const findUser = await user.findOne({ _id: decode.id });
  if (!findUser) {
    res.statusCode = 403;
    res.statusText = "Unauthorized_User";
    throw new Error("Unauthorized user !");
  }
  const loggedUser = findUser.toObject();
  loggedUser.password = "undefined";
  delete loggedUser.password;
  req.user = loggedUser;
  next();
});

const authControllerShare = asyncAuthWrapper(async (req, res, next) => {
  const { account_id } = req.headers;
  if (!account_id) {
    res.statusCode = 400;
    throw new Error("User account not selected");
  }
  const validateId = mongoose.isValidObjectId(account_id);
  if (!validateId) {
    res.statusCode = 403;
    throw new Error("Invalid account selected");
  }
  const accountId = mongoose.Types.ObjectId(account_id);
  const user = req.user;
  const currentAccount = await accounts.findOne({
    _id: accountId,
    user: user._id,
  });
  if (!currentAccount) {
    res.statusCode = 400;
    throw new Error("Account not created or selected yet");
  }
  let currentPassword = decryptText(currentAccount.password);
  let token = currentAccount?.accessToken;
  if (!token) {
    const reqLogin = await axios.post(config.meroshare.login, {
      clientId: currentAccount.clientId,
      username: currentAccount.userName,
      password: currentPassword,
    });
    const authorization = await reqLogin.headers.authorization;
    currentAccount.accessToken = authorization;
    token = authorization;
    currentAccount.save();
  }
  const decode = jwt.decode(token);
  if (decode.exp < (new Date().getTime() + 1) / 1000) {
    const reqLogin = await axios.post(config.meroshare.login, {
      clientId: currentAccount.clientId,
      username: currentAccount.userName,
      password: currentPassword,
    });
    const authorization = await reqLogin.headers.authorization;
    currentAccount.accessToken = authorization;
    token = authorization;
    currentAccount.save();
  }
  const reqUser = await axios({
    method: "GET",
    url: config.meroshare.details,
    headers: {
      Authorization: token,
    },
  });
  const reqBank = await axios({
    method: "GET",
    url: config.meroshare.bank,
    headers: {
      Authorization: token,
    },
  });
  const resUser = await reqUser.data;
  const resBank = await reqBank.data;
  req.userAccount = {
    ...resUser,
    bank: resBank[0],
    authToken: token,
  };
  next();
});

module.exports = {
  authMain: authControllerUser,
  authShare: authControllerShare,
};
