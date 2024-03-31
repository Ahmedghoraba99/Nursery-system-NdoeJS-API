const express = require("express");
const teacherValidator = require("../middleware/teacherValidator");
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  getTeacher,
  deleteTeacher,
} = require("../controller/teacherController");
const validatorResults = require("../middleware/validatorResults");
const { upload, saveImageIfExists } = require("../middleware/uploadImg");
const { sameID } = require("../middleware/authorized");
const router = express.Router();

router
  //GET All teachers
  .route("/teachers")
  .get(getAllTeachers)
  //Add teacher
  .post(
    upload.single("image"),
    teacherValidator.insertValidator,
    validatorResults,
    saveImageIfExists,
    addTeacher
  )
  //Update teacher
  .patch(
    upload.single("image"),
    teacherValidator.updateValidator,
    validatorResults,
    saveImageIfExists,
    updateTeacher
  );

router
  .route("/teachers/:id/changepassword")
  .patch(sameID, teacherValidator.idValidator, validatorResults, updateTeacher);
router
  .route("/teachers/:id")
  //Get teacher by id
  .get(sameID, teacherValidator.idValidator, validatorResults, getTeacher)
  // Delete teacher by id
  .delete(teacherValidator.idValidator, validatorResults, deleteTeacher)
  .patch(teacherValidator.idValidator, validatorResults, updateTeacher);

module.exports = router;
