const luminosite = require("../models/luminosite");
const device = require('../models/device');
const moment = require('moment');

const GetAll = async (req, res) => {
  let existingluminosite;
  try {
    existingluminosite = await luminosite.find();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingluminosite });
};

const FindById = async (req, res) => {
  const { id } = req.params;

  let existingluminosite;

  try {
    existingluminosite = await luminosite.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingluminosite) {
    return res
      .status(500)
      .json({ success: false, message: "luminosite doens't exist!!" });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingluminosite });
};

const Updateluminosite = async (req, res) => {
  const { val_luminosite, date} = req.body;
  const { id } = req.params;

  let existingluminosite;

  try {
    existingluminosite = await luminosite.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingluminosite) {
    return res
      .status(500)
      .json({ success: false, message: "luminosite doens't exist!!" });
  }

  existingluminosite.val_luminosite = val_luminosite;
  existingluminosite.date = date;
  
  

  try {
    await existingluminosite.save();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({
      success: true,
      messag: "Updated Successfully ",
      data: existingluminosite,
    });
};

const Ajout = async (req, res) => {
  const {val_luminosite, id_device } = req.body;

  const full_date = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
  const date = moment(new Date()).format('DD/MM');

  const newluminosite = new luminosite({
    val_luminosite,
    date,
    full_date,
    id_device
  });

  let existingdevice;

  try {
   
    existingdevice = await device.findById(id_device);
  } catch (error) {
    return res.status(500).json({success: false, message: "something went wrong fetching device", data: error});
  }
  console.log(existingdevice);
  try {
    await newluminosite.save();
    existingdevice.luminosite_readings.push(newluminosite);
    await existingdevice.save();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong while saving ", data: error });
  }

  return res
    .status(201)
    .json({ success: true, messag: "success", data: newluminosite });
};

const Deleteluminosite = async (req, res) => {
  const { id } = req.params;

  let existingluminosite;

  try {
    existingluminosite = await luminosite.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingluminosite) {
    return res
      .status(500)
      .json({ success: false, message: "luminosite doens't exist!!" });
  }

  try {
    await existingluminosite.remove();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "deleted successfully" });
};


const device_stats = async (req, res) => {

  const { id } = req.body;



  let readings;
  try {
      readings = await luminosite
        .find({ id_device: id })
        .limit(7)
        .select({ full_date: 1, val_luminosite: 1 });

  } catch (error) {
      return res.status(500).json({success: false, message: "something went wrong ", data: error});
  }
  
  return res.status(200).json({success: true, message: "success ", data: readings});
}

exports.device_stats = device_stats;
exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updateluminosite = Updateluminosite;
exports.Ajout = Ajout;
exports.Deleteluminosite = Deleteluminosite;