const express = require("express");
const { body, validationResult } = require("express-validator");
//ABP
const {
  AddDeviceABP,
  FindallDeviceABP,
  FindsinglDeviceABP,
  updateDeviceABP,
  deletDeviceABP,
} = require("../controllers/device.controller");


const router = express.Router();
// add devices
router.post(
  "/dev",
  body("IDdevice").isLength({ min: 8 }),
  body("IDdevice").notEmpty(),
  body("devactivation").notEmpty(),
  body("devEUI").notEmpty(),
  body("devaddr").notEmpty(),
  

  AddDeviceABP
);
// find all devices devices
router.get("/dev", FindallDeviceABP);
// add devices
router.get("/dev/:id", FindsinglDeviceABP);
// add devices
router.put("/dev/:id", 
body("IDdevice").isLength({ min: 8 }),
  body("IDdevice").notEmpty(),
  updateDeviceABP);
// add devices
router.delete("/dev/:id", deletDeviceABP);


module.exports = router;
