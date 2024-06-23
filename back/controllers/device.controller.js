const Device = require("../models/device.model");
const { validationResult } = require("express-validator");

const AddDeviceABP = async (req, res) => {
    let ExistDevice;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() , message:"verifier les champs"});
  } else {
    try {
   ExistDevice = await Device.findOne({ IDdevice: req.body.IDdevice });
   if (ExistDevice) {
     return res.status(400).json({ message: "Device exist" });
   } else {
     await Device.create(req.body);
     res.status(201).json({ message: "Devices add with success" });
   }
  } catch (error) {
      console.log(error.message);
    }
  }
};
const FindallDeviceABP = async (req, res) => {
  try {
    const data = await Device.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
const FindsinglDeviceABP = async (req, res) => {
  try {
  
     const data = await Device.findOne({ _id: req.params.id });
     res.status(201).json(data);
   }
    
   catch (error) {
    console.log(error.message);
  }
};
const updateDeviceABP = async (req, res) => {
  let ExistDevice;
  try {
    ExistDevice = await Device.findOne({ IDdevice: req.body.IDdevice });
   if (ExistDevice) {
     return res.status(400).json({ message: "Device exist" });
   }else{
    const data = await Device.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(data);
  }} catch (error) {
    console.log(error.message);
  }
};
const deletDeviceABP = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() , message:"verifier les champs"});}
    else{
  try {
    await Device.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "device deleted with success" });
  } catch (error) {
    console.log(error.message);
  }
}
};
module.exports = {
  AddDeviceABP,
  FindsinglDeviceABP,
  FindallDeviceABP,
  updateDeviceABP,
  deletDeviceABP,
};
