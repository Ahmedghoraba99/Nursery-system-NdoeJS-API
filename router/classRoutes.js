const express = require("express");
const classValidator = require("../middleware/classValidator");
const isAuthorized = require("../middleware/authorized").isAdmin;
const {
  getAllClasses,
  addClass,
  updateClass,
  getClass,
  getClassChildrenInfo,
  deleteClass,
  getClassSupervisorInfo,
} = require("../controller/classController");
const validatorResults = require("../middleware/validatorResults");
const {
  isAdmin,
  isTeacher,
  sameClassSupervisor,
  sameID,
} = require("../middleware/authorized");
const router = express.Router();
router.use("/class", isTeacher);

router
  .route("/class")
  .get(isAdmin, getAllClasses)
  .post(
    isAdmin,
    classValidator.insertClassValidator,
    validatorResults,
    addClass
  )
  .patch(
    isAdmin,
    classValidator.updateClassValidator,
    validatorResults,
    updateClass
  );

router.get(
  "/class/children/:id",
  sameClassSupervisor,
  classValidator.idValidator,
  getClassChildrenInfo
);
router.get(
  "/class/teacher/:id",
  sameClassSupervisor,
  classValidator.idValidator,
  getClassSupervisorInfo
);

router
  .route("/class/:id")
  .get(
    isTeacher,
    sameClassSupervisor,
    classValidator.idValidator,
    validatorResults,
    getClass
  )
  .delete(isAdmin, classValidator.idValidator, validatorResults, deleteClass);

module.exports = router;
