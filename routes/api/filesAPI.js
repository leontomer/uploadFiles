const express = require("express");
const router = express.Router();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// const url = config.mongoURI;
const connect = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

// Create storage engine
const storage = new GridFsStorage({
  url: "mongodb+srv://Aw5wAm4mUGi2gTjq:Aw5wAm4mUGi2gTjq@cluster0.xt0mn.gcp.mongodb.net/files?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

router.get("/check-if-file-exists/:filename", (req, res) => {
  gfs.find().toArray((err, files) => {
    if (files.filter((e) => e.filename === req.params.filename).length > 0) {
      return res.json({
        result: "error",
        message: "file with this name already exist!",
      });
    } else {
      return res.json({
        result: "ok",
        message: "file doesn't exist yet",
      });
    }
  });

  const upload = multer({ storage });
  router.post("/upload", upload.single("file"), (req, res) => {
    res.json({
      result: "success",
      message: "file uploaded!",
    });
  });
});

router.get("/getFile/:filename", (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No files available",
      });
    }
    try {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } catch (error) {
      console.error(error);
    }
  });
});

module.exports = router;
