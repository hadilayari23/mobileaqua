const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const PORT = 4000;
const userRouter = require("./routes/user");
const deviceRouter = require("./routes/devices");
const router = require("./routes/deviceroutes");
const intensity = require("./routes/intensity");
const luminositeRouter = require("./routes/luminositeRouter");
const StatsRouter = require("./routes/stats");
const { PythonShell } = require("python-shell");
var spawn = require("child_process").spawn;

const server = express();
server.use(bodyparser.json());
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

//img
server.use("/uploads/images", express.static(path.join("uploads", "images")));

server.get("/", (req, res) => {
  res.send("hello wolrd!");
});

server.use("/user", userRouter);
server.use("/devices_old", router);
server.use("/device", deviceRouter);
server.use("/intensity", intensity);
server.use("/luminosite", luminositeRouter);
server.use("/stats", StatsRouter);

server.get("/py", (req, res) => {
  var process = spawn("python", ["./downloadPython.py"]);

  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on("data", function (data) {
    console.log(data.toString());
    res.send(data.toString());
  });
});




mongoose
  .connect(
    "mongodb+srv://hadil:hadil@cluster0.gddgc2m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("DB error: " + error));
