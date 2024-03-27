const teachers = require("../model/teacherSchema");

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
  console.log("_id", req.params.id);
  teachers
    .findById(req.params.id)
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
      //test
    })
    .catch((err) => {
      next(err + "teacher controleer");
    });
};

const addTeacher = (req, res, next) => {
  // teachers.init();
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

const deleteTeacher = (req, res, next) => {
  teachers
    .deleteOne({ _id: req.params.id })
    .then(() => {
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
