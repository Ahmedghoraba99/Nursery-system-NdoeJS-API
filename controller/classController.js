const childSchema = require("../model/childSchema");
const classes = require("../model/classSchema");
const teacherSchema = require("../model/teacherSchema");

const getAllClasses = (req, res) => {
  // handle the request and send a response
  classes
    .find({})
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getClass = (req, res) => {
  classes
    .findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const addClass = (req, res) => {
  const _class = new classes(req.body);
  _class
    .save()
    .then((data) => {
      res.status(201).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const updateClass = (req, res) => {
  classes
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteClass = (req, res) => {
  // handle the request and send a response
  classes
    .deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getClassChildrenInfo = (req, res, next) => {
  const childrenInfo = [];
  classes
    .findOne({ _id: req.params.id }, { children: 1 })
    .then((data) => {
      if (!data) throw new Error("Class not found");

      const childPromises = data.children.map((childId) => {
        return childSchema.findOne({ _id: childId });
      });

      return Promise.all(childPromises);
    })
    .then((childDataArray) => {
      childDataArray.forEach((childData) => {
        if (childData) {
          childrenInfo.push(childData);
        }
      });

      if (childrenInfo.length === 0) {
        throw new Error("No children found");
      }

      res.status(200).json({
        status: "success",
        data: childrenInfo,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getClassSupervisorInfo = (req, res) => {
  // handle the request and send a response
  classes
    .findOne({ _id: req.params.id }, { supervisor: 1 })
    .then((data) => {
      teacherSchema.findOne({ _id: data.supervisor }).then((teacherData) => {
        res.status(200).json({
          status: "success",
          data: teacherData,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getAllClasses,
  addClass,
  updateClass,
  getClass,
  getClassChildrenInfo,
  getClassSupervisorInfo,
  deleteClass,
};
