// login middleware using mongoose
const teachers = require("../model/teacherSchema");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("ghere");
  const { email, password } = req.body;

  // Find the teacher by email
  teachers
    .findOne({ email, password })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Invalid email or password");
      }
      req.teacher = {
        _id: teacher._id,
        email: teacher.email,
        name: teacher.name,
        role: teacher.role,
      };
      const token = jwt.sign(req.teacher, process.env.JWT_SECRET);
      console.log(token);
      req.header.authorization = token;
      res.status(200).json({ token });
      console.log("logged in", token);
      next();
    })
    .catch((err) => {
      next(err);
    });
};
