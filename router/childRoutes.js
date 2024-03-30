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
  .get(getAllStudents)
  .post(studentValidator.insertValidator, validatorResults, addStudent)
  .patch(studentValidator.updateValidator, validatorResults, updateStudent);

router
  .route("/child/:id/updateimg")
  .patch(studentValidator.idValidator, validatorResults, updateStudent);
router
  .route("/child/:id")
  .get(
    studentValidator.idValidator,
    studentValidator.updateValidator,
    validatorResults,
    getStudent
  )
  .delete(studentValidator.idValidator, validatorResults, deleteStudent);

module.exports = router;
