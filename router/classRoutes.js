const express = require("express");
const classValidator = require("../middleware/classValidator");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const notFound = require("../middleware/notFound");
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
const router = express.Router();

router
  .route("/class")
  .get(logger, isAuthorized, getAllClasses, notFound)
  .post(
    logger,
    isAuthorized,
    classValidator.insertClassValidator,
    validatorResults,
    addClass,
    notFound,
    errorHandler
  )
  .patch(
    logger,
    isAuthorized,
    classValidator.updateClassValidator,
    validatorResults,
    updateClass,
    notFound,
    errorHandler
  );

router.get(
  "/class/children/:id",
  logger,
  isAuthorized,
  classValidator.idValidator,
  getClassChildrenInfo
);
router.get(
  "/class/teacher/:id",
  logger,
  isAuthorized,
  classValidator.idValidator,
  getClassSupervisorInfo
);

router
  .route("/class/:id")
  .get(
    logger,
    isAuthorized,
    classValidator.idValidator,
    validatorResults,
    getClass,
    notFound,
    errorHandler
  )
  .delete(
    logger,
    isAuthorized,
    classValidator.idValidator,
    validatorResults,
    deleteClass,
    notFound,
    errorHandler
  );

module.exports = router;
