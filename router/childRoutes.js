const express = require("express");
const studentValidator = require("../middleware/childValidator");
const {
  getAllStudents,
  addStudent,
  updateStudent,
  getStudent,
  deleteStudent,
} = require("../controller/childController");
const validatorResults = require("../middleware/validatorResults");
const { upload, saveImageIfExists } = require("../middleware/uploadImg");
const { isAdmin } = require("../middleware/authorized");
const router = express.Router();
router.use("/child", isAdmin);
router
  .route("/child")
  .get(getAllStudents)
  .post(
    upload.single("image"),
    studentValidator.insertValidator,
    validatorResults,
    saveImageIfExists,
    addStudent
  )
  .patch(
    upload.single("image"),
    studentValidator.updateValidator,
    validatorResults,
    updateStudent,
    saveImageIfExists
  );

router
  .route("/child/:id/updateimg")
  .patch(
    upload.single("image"),
    saveImageIfExists,
    studentValidator.idValidator,
    validatorResults,
    updateStudent
  );
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
