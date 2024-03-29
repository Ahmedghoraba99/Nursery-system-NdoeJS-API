const { body, param } = require("express-validator");
const teachers = require("../model/teacherSchema");
const idValidator = [param("id").isMongoId().withMessage("Not a valid ID")];
const insertValidator = [
  body("fullname")
    .isLength({ min: 3 })
    .withMessage("name should be a string and > 3 chars"),
  body("password").isString().isLength({ min: 6 }).withMessage("min length =6"),
  body("email")
    .isEmail()
    .withMessage("check the email format")
    .custom(async (value, { req }) => {
      try {
        const teacher = await teachers.findOne({ email: value });
        if (teacher) {
          throw new Error("email already exists");
        }
      } catch (error) {
        throw new Error("email already exists");
      }
    }),
  body("image").isString().withMessage("Please provide a valid image url"),
];
const updateValidator = [
  body("id").isMongoId(), //because it's of type hexaDecimal....
  body("fullname").optional().isLength({ min: 3 }),
  body("password").optional().isString({ min: 6 }),
  body("email")
    .optional()
    .isEmail()
    .custom((value) => {
      //email uniquness check
      teachers
        .findOne({ email: value, _id: { $ne: body("id") } })
        .then((teacher) => {
          if (teacher) {
            throw new Error("email already exists");
          }
        });
    }),
  body("image").optional().isURL(),
];

module.exports = {
  insertValidator,
  updateValidator,
  idValidator,
};
