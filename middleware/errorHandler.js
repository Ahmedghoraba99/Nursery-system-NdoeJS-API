const errorHandler = (error, request, response, next) => {
  console.error("An err has Orcuded!! : ", error.message);
  response.status(500).json({
    error: error.message,
  });
};
module.exports = errorHandler;
