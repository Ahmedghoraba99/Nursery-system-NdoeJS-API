const multer = require("multer");
const path = require("path");
const fs = require("fs");

// File filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ fileFilter });

const defaultImgIfNonProvided = (req) => {
  if (!req.file) {
    req.body.image =
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.pn";
  }
};

// Save image middleware
const saveImageIfExists = (req, res, next) => {
  if (!req.file) {
    defaultImgIfNonProvided(req);
    return next();
  }

  const originalFileName = req.file.originalname;
  const currentDate = new Date().toISOString().replace(/:/g, "-");
  const newFileName = `${currentDate}_${originalFileName}`;
  const filePath = path.join(__dirname, "..", "imgs", newFileName);

  fs.writeFile(filePath, req.file.buffer, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return next(err);
    }
    req.body.image = `/imgs/${newFileName}`;
    next();
  });
};
module.exports = { upload, saveImageIfExists };
