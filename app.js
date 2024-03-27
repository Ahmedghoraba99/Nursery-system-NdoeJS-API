//requires
const express = require("express");
const mongoose = require("mongoose");
const dot_env = require("dotenv").config();
const teachersRouter = require("./router/teacherRoutes");
const childRoutes = require("./router/childRoutes");
const classRoutes = require("./router/classRoutes");
const loginRoutes = require("./router/login");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const { isAuthorized, isTeacher } = require("./middleware/authorized");
//env variables
const dbURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/nurserySystem";
const port = process.env.PORT || 8080;
//initalizing
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //img
//auth layers
app.use("/teachers", isAuthorized);

app.use(logger);
app.use(loginRoutes);
app.use(teachersRouter);
app.use(childRoutes);
app.use(classRoutes);
app.use(errorHandler);

//start the server
