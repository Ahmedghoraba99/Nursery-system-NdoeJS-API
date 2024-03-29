const { validationResult } = require("express-validator");
module.exports = (req, _res, next) => {
  let result = validationResult(req);
  console.log("Validation Result:", result); // Add this line for logging
  if (!result.isEmpty()) {
    let errorMsg = result
      .array()
      .map((error) => error.msg)
      .join(" : ");
    let error = new Error(errorMsg);
    error.status = 422;
    next(error);
  } else {
    next();
  }
};
