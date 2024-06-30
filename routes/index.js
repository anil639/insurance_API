const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Worker } = require("worker_threads");
const path = require("path");

//file upload

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  //new worker thread for processing
  const worker = new Worker(
    path.resolve(__dirname, "../workers/dataUploadWorker.js"),
    {
      workerData: {
        filePath: req.file.path,
      },
    }
  );

  worker.on("message", (message) => {
    return res.status(200).send(message);
  });

  worker.on("error", (error) => {
    return res.status(500).send(`Worker Error: ${error}`);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      return res.status(500).send(`Worker stopped with exit code ${code}`);
    }
  });
});

module.exports = router;
