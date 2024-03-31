const jwt = require("jsonwebtoken");
const classSchema = require("../model/classSchema");
const isAuthorized = (req, res, next) => {
  let token = req.get("authorization");
  // console.log(token);
  try {
    if (!token) {
      throw new Error("Unauthorized pleas login first");
    }
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded.user;
    // console.log("req.role", req.role);
    next();
  } catch (error) {
    next(error);
  }
};

const isTeacher = (req, _res, next) => {
  let token = req.get("authorization");
  if (!token) {
    console.log("token not found");
    next(new Error("Unauthorized, please login first"));
    return;
  } else {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded.user;
    if (decoded.role === "teacher" || decoded.role === "admin") {
      next();
    } else {
      next(new Error("Unauthorized, teacher only"));
    }
  }
};

const isAdmin = (req, _res, next) => {
  let token = req.get("authorization");
  if (!token) {
    next(new Error("Unauthorized, please login first"));
    return;
  }
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  req.user = decoded.user;
  if (decoded.role === "admin") {
    next();
  } else {
    next(new Error("Unauthorized, admin only"));
  }
};

const sameID = (req, _res, next) => {
  let token = req.get("authorization");
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  req.user = decoded.user;
  if (req.user.id === req.params.id || req.user.role === "admin") {
    next();
  } else {
    next(new Error("Unauthorized, you can only edit your own account"));
  }
};

const sameClassSupervisor = (req, _res, next) => {
  classSchema.findOne({ supervisor: req.params.id }, (err, result) => {
    if (err) {
      next(err);
      return;
    } else {
      if (result.supervisor === req.params.id || req.user.role === "admin") {
        next();
      } else {
        next(
          new Error(
            "Unauthorized, you can only access the class you are a supervisor of"
          )
        );
      }
    }
  });
};
module.exports = {
  isAuthorized,
  isTeacher,
  isAdmin,
  sameID,
  sameClassSupervisor,
};
