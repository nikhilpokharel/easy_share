const dotenv = require("dotenv");
dotenv.config();

const config = {
  meroshare: {
    bankList: process.env.MEROSHARE_BANK_LIST_URL,
    login: process.env.MEROSHARE_LOGIN_URL,
    details: process.env.MEROSHARE_USER_DETAILS,
    details_ext: process.env.MEROSHARE_USER_DETAILS_EXTENDED,
    bank: process.env.MEROSHARE_USER_BANK,
    portfolio: process.env.MEROSHARE_USER_PORTFOLIO,
    asba: process.env.MEROSHARE_USER_ASBA,
    applicationReportNew: process.env.MEROSHARE_USER_APPLICATION_REPORT,
    applicationReportOld: process.env.MEROSHARE_USER_APPLICATION_REPORT_OLD,
    secret: process.env.PASSWORD_SECRET,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.TOKEN_SECRET,
    expiryDate: process.env.TOKEN_EXPIRE_TIME,
  },
  app: {
    originRegex: process.env.ORIGIN_REGEX,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    port: process.env.PORT,
  },
};

module.exports = config;
