const asyncAuthWrapper = (fn = (req, res, next)) => {
  return async function (req, res, next) {
    try {
      return await fn.apply(this, [req, res, next]);
    } catch (error) {
      const tokenExpired =
        error.name == "TokenExpiredError" || error.name == "JsonWebTokenError"
          ? true
          : false;
      const status =
        error?.response?.statusText || res?.statusText || "Invalid_Request";
      const message = error?.response?.data?.message;
      const statusCode =
        res?.statusCode && res.statusCode == 200 ? 500 : res.statusCode;

      res.status(tokenExpired ? 403 : statusCode).json({
        ok: false,
        statusText: status,
        statusCode: statusCode,
        expired: tokenExpired,
        message: message || error?.message || "Error handling request.",
      });
      return;
    }
  };
};

module.exports = asyncAuthWrapper;
