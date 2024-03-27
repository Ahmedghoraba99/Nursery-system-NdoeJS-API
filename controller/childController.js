const students = require("../model/childSchema");
const getAllStudents = (req, res) => {
  students
    .find({})
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getStudent = (req, res) => {
  const id = req.params.id;
  students
    .findById(id)
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      nex(err);
    });
};

const addStudent = (req, res, next) => {
  // req.body._id = 334;
  console.log(req.body);
  const student = new students(req.body);
  student
    //pre save hook
    .save()
    .then((result) => {
      res.status(201).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const updateStudent = (req, res) => {
  const id = req.params.id;
  students
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteStudent = (req, res) => {
  const id = req.params.id;
  students
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  getStudent,
  deleteStudent,
};
