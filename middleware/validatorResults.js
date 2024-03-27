const { validationResult } = require("express-validator");
module.exports = (req, res, next) => {
  let result = validationResult(req);

  // console.log(result);
  if (result.errors.length > 0) {
    // console.log(result.errors);
    // console.log("herehere");
    let errorMsg = result.errors.reduce(
      (current, item) => current + item.msg + " : ",
      ""
    );
    let error = new Error(errorMsg);
    error.status = 422;
    next(error);
  } else next();
};
