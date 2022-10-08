const asyncWrapper = (fn = (req, res, next)) => {
  return async function (req, res, next) {
    try {
      return await fn.apply(this, [req, res, next]);
    } catch (error) {
      const errorMessage = res?.message || "Something went wrong, try again";
      const statusCode =
        res?.statusCode && res.statusCode == 200 ? 500 : res.statusCode;
      res.status(statusCode).json({
        ok: false,
        message: errorMessage,
        data: [],
      });
      return;
    }
  };
};

module.exports = asyncWrapper;
