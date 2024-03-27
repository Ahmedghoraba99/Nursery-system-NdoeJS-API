const express = require("express");
const studentValidator = require("../middleware/childValidator");
// const teacherController = require("../controller/teacherController");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
// const isAuthorized = require("../middleware/authorized").isAuthorized;
const {
  getAllStudents,
  addStudent,
  updateStudent,
  getStudent,
  deleteStudent,
} = require("../controller/childController");
const validatorResults = require("../middleware/validatorResults");
const router = express.Router();

router
  .route("/child")
  .get(logger, getAllStudents, notFound, errorHandler)
  .post(
    logger,
    studentValidator.insertValidator,
    validatorResults,
    addStudent,
    notFound,
    errorHandler
  )
  .patch(
    logger,
    studentValidator.updateValidator,
    validatorResults,
    updateStudent,
    notFound,
    errorHandler
  );

router
  .route("/child/:id")
  .get(
    logger,
    studentValidator.idValidator,
    validatorResults,
    getStudent,
    notFound,
    errorHandler
  )
  .delete(
    logger,
    studentValidator.idValidator,
    validatorResults,
    deleteStudent,
    notFound,
    errorHandler
  );

module.exports = router;
