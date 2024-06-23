const express = require("express");
const luminositeController = require("../controllers/luminosites");
const route = express.Router();

route.get("/", luminositeController.GetAll);

route.get("/:id", luminositeController.FindById);

route.patch("/:id", luminositeController.Updateluminosite);

route.delete("/:id", luminositeController.Deleteluminosite);

route.post("/add", luminositeController.Ajout);

route.post('/stats', luminositeController.device_stats );

module.exports = route;