const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileName = `${req.body.fullname}_${req.body.email}_${file.originalname}`;
    req.body.image = `imgs/${fileName}`;
    cb(null, path.join(__dirname, "..", "imgs"));
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.fullname}_${req.body.email}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
