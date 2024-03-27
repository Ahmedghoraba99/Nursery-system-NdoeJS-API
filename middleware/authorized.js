const jwt = require("jsonwebtoken");
const isAuthorized = (req, res, next) => {
  let token = req.get("authorization");
  console.log(token);
  try {
    if (!token) {
      throw new Error("Unauthorized pleas login first");
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded.user;
    console.log("req.role", req.role);
    next();
  } catch (error) {
    next(error);
  }
};

const isTeacher = (req, _res, next) => {
  let token = req.get("authorization");
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  req.user = decoded.user;
  if (decoded.role === "admin") {
    next();
  } else {
    next(new Error("Unauthorized, admin only"));
  }
};

const isAdmin = (req, _res, next) => {
  let token = req.get("authorization");
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  req.user = decoded.user;
  if (decoded.role === "admin") {
    next();
  } else {
    next(new Error("Unauthorized, admin only"));
  }
};
module.exports = { isAuthorized, isTeacher, isAdmin };
