//registeration midlleware
const teachers = require("../model/teacherSchema");
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.SALT);

const newUser = (req, res, next) => {
  console.log(req.file);
  //   console.log(req.body);
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    req.body.password = hash;
    req.body.role = "teacher"; //resetting the role to teacher manually as the schema allows multiple admins
    const newTeacher = new teachers(req.body);
    newTeacher
      .save()
      .then(() => {
        console.log;
        req.body.id = newTeacher._id;
        req.body.name = newTeacher.fullname;
        res.status(201).json({
          status: "success",
          message: "registeration successful",
        });
      })
      .catch((err) => {
        next(err);
      });
  });
};

module.exports = newUser;
