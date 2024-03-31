// requires
const express = require("express");
const mongoose = require("mongoose");
const dot_env = require("dotenv").config();
const SwaggerUI = require("swagger-ui-express");
const teachersRouter = require("./router/teacherRoutes");
const childRoutes = require("./router/childRoutes");
const classRoutes = require("./router/classRoutes");
const loginRoutes = require("./router/loginAndRegister");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const { isAuthorized, isTeacher } = require("./middleware/authorized");
const swaggerDocument = require("./swagger.json");

// env variables
const dbURL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/nurserySystem";
const port = process.env.PORT || 8080;

// initializing
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

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve Swagger UI
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));

// auth layers
app.use("/teachers", isAuthorized);

app.use(logger); // top level logger
app.use(loginRoutes);
app.use(teachersRouter);
app.use(childRoutes);
app.use(classRoutes);
app.use(errorHandler); // top level error handler

// start the server
