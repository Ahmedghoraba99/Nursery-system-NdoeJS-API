const { body, param, check } = require("express-validator");

const idValidator = [param("id").isInt().withMessage("Not a valid ID")];

const insertValidator = [
  check("fullName").isString().withMessage("Full name is required"),
  check("age").isInt({ min: 2 }).withMessage("Age must be a positive integer"),
  check("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must be one of PreKG, KG1, KG2"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.street").notEmpty().withMessage("Street is required"),
  body("address.building").notEmpty().withMessage("Building is required"),
];

const updateValidator = [
  check("_id").isNumeric().withMessage("ID must be a number"),
  check("fullName").optional().isString().withMessage("Full name is required"),
  check("age")
    .optional()
    .isInt({ min: 2 })
    .withMessage("Age must be a positive integer"),
  check("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("Level must be one of PreKG, KG1, KG2"),
  body("address.city").optional().notEmpty().withMessage("City is required"),
  body("address.street")
    .optional()
    .notEmpty()
    .withMessage("Street is required"),
  body("address.building")
    .optional()
    .notEmpty()
    .withMessage("Building is required"),
];

module.exports = {
  insertValidator,
  updateValidator,
  idValidator,
};
