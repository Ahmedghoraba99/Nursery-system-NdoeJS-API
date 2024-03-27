const notFound = function (req, res, next) {
  res.status(404).json({
    status: "error",
    message: "Not found",
  });
};

module.exports = notFound;
