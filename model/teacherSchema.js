const mongoose = require("mongoose");

//1- create schema object
// teacher Data: _id(objectID), fullname,password, email , image (which is string)

const teacherSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  //enum role
  role: {
    type: String,
    enum: ["teacher", "admin"],
    default: "teacher",
    required: true,
  },
});

//2-mapping
module.exports = mongoose.model("teacher", teacherSchema);
