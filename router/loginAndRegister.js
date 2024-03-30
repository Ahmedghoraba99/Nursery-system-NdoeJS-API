const express = require("express");
const login = require("../middleware/login");
const newUser = require("../middleware/registeration");
const { insertValidator } = require("../middleware/teacherValidator");
const validatorResults = require("../middleware/validatorResults");
const { upload, saveImageIfExists } = require("../middleware/uploadImg");
const router = express.Router();

router
  .route("/login")
  .get((req, res) => {
    res.send("login page");
  })
  .post(login);

router
  .route("/register")
  .get((req, res) => {
    res.send("register page");
  })
  .post(
    upload.single("image"),
    insertValidator,
    validatorResults,
    saveImageIfExists,
    newUser
  );
module.exports = router;
