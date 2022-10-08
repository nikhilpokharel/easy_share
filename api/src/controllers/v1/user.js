const asyncWrapper = require("@asyncWrapper");
const account = require("@src/models/accounts");
const { encryptText } = require("@src/helper/crypto");
const user = require("@src/models/user");

const userController = {
  profile: asyncWrapper(async (req, res) => {
    const currentUser = req.user;
    const userProfile = await user
      .findById(currentUser._id)
      .select("-password -accessToken");
    res.json({
      ok: true,
      data: userProfile,
    });
  }),
  getAccounts: asyncWrapper(async (req, res) => {
    const user = req.user;
    const userAccounts = await account
      .find({ user: user._id })
      .select("-accessToken -user -password")
      .sort({ _id: -1 });
    res.json({
      ok: true,
      data: userAccounts,
    });
  }),
  createAccount: asyncWrapper(async (req, res) => {
    const user = req.user;
    const { accountUser, clientId, userName, password } = req.body;
    const checkClientExist = await account.findOne({
      user: user._id,
      clientId: parseInt(clientId),
      userName,
    });
    if (checkClientExist) {
      res.statusCode = 400;
      res.message =
        "Username associated with clientID has already been created";
      throw new Error("Error");
    }
    const hashPassword = encryptText(password);
    const createAccount = await account.create({
      accountUser,
      user: user._id,
      clientId: parseInt(clientId),
      userName,
      password: hashPassword,
    });
    const createdAccount = createAccount.toObject();
    createdAccount.password = "";
    delete createdAccount.password;
    res.json({
      ok: true,
      data: createdAccount,
      message: "Account created successfully",
    });
  }),
  updateAccount: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const { accountUser, clientId, userName } = req.body;
    const udpateAccountUser = await account.findOneAndUpdate(
      { user: user._id, _id: id },
      {
        accountUser,
        clientId,
        userName,
      },
      { new: true }
    );
    if (!udpateAccountUser) {
      res.statusCode = 404;
      res.message = "Account not found !!";
      throw new Error();
    }
    const updatedAccount = udpateAccountUser.toObject();
    updatedAccount.password = "";
    updatedAccount.accessToken = "";
    delete updatedAccount.password;
    delete updatedAccount.accessToken;
    res.json({
      ok: true,
      data: updatedAccount,
      message: "Account updated successfully",
    });
  }),
  updateAccountPassword: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const { password } = req.body;
    const hashPassword = encryptText(password);
    const initUpdatePassword = await account.findOneAndUpdate(
      { user: user._id, _id: id },
      {
        password: hashPassword,
        accessToken: "",
      },
      { new: true }
    );
    const updatedAccount = initUpdatePassword.toObject();
    updatedAccount.password = "";
    updatedAccount.accessToken = "";
    delete updatedAccount.password;
    delete updatedAccount.accessToken;
    res.json({
      ok: true,
      data: updatedAccount,
      message: "Password updated successfully",
    });
  }),
  deleteAccount: asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deleteAccount = await account.findByIdAndDelete(id);
    const deletedAccount = deleteAccount.toObject();
    delete deletedAccount.password;
    delete deletedAccount.accessToken;
    res.json({
      ok: true,
      data: deletedAccount,
      message: "Account deleted successfully",
    });
  }),
};

module.exports = userController;
