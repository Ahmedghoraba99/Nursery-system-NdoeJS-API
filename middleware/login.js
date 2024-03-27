const bcrypt = require("bcrypt");
const teachers = require("../model/teacherSchema");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { email, password } = req.body;
  teachers
    .findOne({ email })
    .then((teacher) => {
      const passwordMatch = bcrypt.compareSync(password, teacher.password);
      if (!teacher || !passwordMatch) {
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
