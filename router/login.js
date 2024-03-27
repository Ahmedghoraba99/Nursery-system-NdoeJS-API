const express = require("express");
const login = require("../middleware/login");
const router = express.Router();

router
  .route("/login")
  .get((req, res) => {
    res.send("login page");
  })
  .post(login, (req, res) => {
    // res.status(200).json({
    //   status: "success",
    //   message: "login successfull",
    // });
  });

module.exports = router;
