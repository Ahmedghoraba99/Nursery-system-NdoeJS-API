const { body, param, check } = require("express-validator");
const childSchema = require("../model/childSchema");
const teacherSchema = require("../model/teacherSchema");

const idValidator = [param("id").isInt().withMessage("Not a valid ID")];

const insertClassValidator = [
  body("name").isString().withMessage("Name is required"),
  //Supervisor validation
  body("supervisor")
    .isString() // changed from isInt()
    .withMessage("Supervisor must be a teacher ID number")
    .custom((value) => {
      return teacherSchema.findOne({ _id: value }).then((teacher) => {
        if (!teacher || teacher.role !== "admin") {
          throw new Error(
            "Supervisor does not exist in the database or not an admin"
          );
        }
      });
    })
    .withMessage("Supervisor does not exist in the database or not an admin"),
  body("children.*")
    .isInt()
    .withMessage("Children must be an array of ID numbers")
    .custom((childIdArr) => {
      console.log("childIdArr:", childIdArr); // prints 31,32
      const promises = [];
      for (let i = 0; i < childIdArr.length; i++) {
        const childID = childIdArr[i].toString();
        const promise = childSchema
          .findOne({ _id: childID })
          .then((child) => {
            if (!child) {
              console.error("Child not found for ID:", childID);
            } else {
              console.log("child:", child);
            }
          })
          .catch((error) => {
            console.error("Error fetching child:", error);
          });
        promises.push(promise);
      }
      return Promise.all(promises);
    })
    .withMessage("One or more children do not exist in the database"),
];

const updateClassValidator = [
  body("name").isString().withMessage("Name is required"),
  body("supervisor")
    .isInt()
    .withMessage("Supervisor must be a teacher ID number")
    .custom((value) => {
      // add custom validation logic here to check if the teacher ID exists in the database
      return true; // replace this with your custom validation logic
    }),
  body("children.*")
    .isInt()
    .withMessage("Children must be an array of ID numbers")
    .custom((childIdArr) => {
      childIdArr.forEach((childID) => {
        childSchema.findOne({ _id: childID }).then((child) => {
          if (!child) {
            throw new Error(
              "One or more children do not exist in the database"
            );
          }
        });
      });
    }),
];
module.exports = {
  insertClassValidator,
  updateClassValidator,
  idValidator,
};
