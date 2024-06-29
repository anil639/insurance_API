const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Anil kumar nayak");
});

mongoose
  .connect("mongodb://localhost:27017/insuranceDB")
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log(e));

app.listen(8000, () => {
  console.log("server listening on 8000");
});
