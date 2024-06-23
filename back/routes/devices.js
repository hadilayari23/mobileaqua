const express = require("express");
const deviceController = require("../controllers/devices");
const route = express.Router();


route.get("/", deviceController.GetAll);

route.post("/", deviceController.GetAllForUser);

route.post("/admin", deviceController.GetAlladmin);

route.post("/state", deviceController.activate);
route.get("/activate",deviceController.activate_device)
route.get("/:id", deviceController.FindById);

route.patch("/:id", deviceController.Updatedevice);

route.delete("/:id", deviceController.Deletedevice);

route.post("/add", deviceController.Ajout);


module.exports = route;
