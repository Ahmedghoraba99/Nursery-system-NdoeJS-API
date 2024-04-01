const teachers = require("../model/teacherSchema");
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.SALT);
const fs = require("fs");
const path = require("path");
const getAllTeachers = (_req, res, next) => {
  teachers
    .find({})
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getTeacher = (req, res, next) => {
  teachers
    .findById(req.params.id)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err + "teacher controleer");
    });
};

const addTeacher = (req, res, next) => {
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    req.body.password = hash;
    const newTeacher = new teachers(req.body);
    newTeacher
      .save()
      .then(() => {
        res.status(201).json({
          status: "success",
          message: "Teacher added successfully",
        });
      })
      .catch((err) => {
        next(err);
      });
  });
};

const updateTeacher = (req, res, next) => {
  teachers
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      console.log();
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteTeacher = async (req, res, next) => {
  const deletedTeacher = teachers
    .findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      try {
        // delete the image
        fs.unlinkSync(path.join(__dirname, "../", data.image));
      } catch (error) {
        next(error);
      }
      console.log("dataaa", data);
      res.status(200).json({
        status: "success",
        message: "Teacher deleted successfully",
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  getTeacher,
  deleteTeacher,
};
