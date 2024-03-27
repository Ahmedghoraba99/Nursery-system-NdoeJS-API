const express = require("express");
const teacherValidator = require("../middleware/teacherValidator");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
const authorization = require("../middleware/authorized");
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  getTeacher,
  deleteTeacher,
} = require("../controller/teacherController");
const validatorResults = require("../middleware/validatorResults");
const router = express.Router();

router
  //GET All teachers
  .route("/teachers")
  .get(logger, getAllTeachers, notFound, errorHandler)
  //Add teacher
  .post(
    logger,
    teacherValidator.insertValidator,
    validatorResults,
    addTeacher,
    notFound,
    errorHandler
  )
  //Update teacher
  .patch(
    logger,
    teacherValidator.updateValidator,
    validatorResults,
    updateTeacher,
    notFound,
    errorHandler
  );

router
  .route("/teachers/:id")
  //Get teacher by id
  .get(
    logger,
    teacherValidator.idValidator,
    validatorResults,
    getTeacher,
    notFound,
    errorHandler
  )
  // Delete teacher by id
  .delete(
    logger,
    teacherValidator.idValidator,
    validatorResults,
    deleteTeacher,
    notFound,
    errorHandler
  )
  .patch(
    logger,
    teacherValidator.idValidator,
    validatorResults,
    updateTeacher,
    notFound,
    errorHandler
  );

module.exports = router;
