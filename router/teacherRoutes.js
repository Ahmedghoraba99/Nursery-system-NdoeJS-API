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
  .post(teacherValidator.insertValidator, validatorResults, addTeacher)
  //Update teacher
  .patch(teacherValidator.updateValidator, validatorResults, updateTeacher);

router
  .route("/teachers/:id/updateimg")
  .patch(
    sameID,
    upload.single("image"),
    saveImageIfExists,
    teacherValidator.idValidator,
    validatorResults,
    updateTeacher
  );
router
  .route("/teachers/:id/changepassword")
  .patch(sameID, teacherValidator.idValidator, validatorResults, updateTeacher);
router
  .route("/teachers/:id")
  //Get teacher by id
  .get(teacherValidator.idValidator, validatorResults, getTeacher)
  // Delete teacher by id
  .delete(teacherValidator.idValidator, validatorResults, deleteTeacher)
  .patch(teacherValidator.idValidator, validatorResults, updateTeacher);

module.exports = router;
