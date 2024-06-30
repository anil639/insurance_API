const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
require("./services/cpuMonitor");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Anil kumar nayak");
});

mongoose
  .connect("mongodb://localhost:27017/insuranceDB")
  .then(() => console.log("DB connected successfully"))
  .catch((e) => console.log(e));

//models
require("./Models/user");
require("./Models/Policy");
require("./Models/lob");
require("./Models/carrier");
require("./Models/account");
require("./Models/agent");

//routes
app.use("/api", routes);

app.listen(8000, () => {
  console.log("server listening on 8000");
});
