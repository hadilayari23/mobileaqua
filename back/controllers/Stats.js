const device = require('../models/device');
const user = require('../models/user');
const intensity = require('../models/intensity');
const luminosite = require("../models/luminosite");

const device_stats = async (req, res) => {

    // const { id } = req.params;

    let admins;
    try {
      admins = await user.find({ status: 2 });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "something went wrong ", data: error });
    }
    
    let users;
    try {
      users = await user.find();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "something went wrong ", data: error });
    }

    // let readings;
    // try {
    //     readings = await device.find({ id_device: id }).
    //     limit(7).
    //     select('date val_intensity');

    // } catch (error) {
    //     return res.status(500).json({success: false, message: "something went wrong ", data: error});
    // }

    let devices;
    try {
        devices = await device.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }
    
    return res.status(200).json({success: true, message: "success ", data: {admins: admins.length, users: users.length, devices: devices.length }});
}

exports.device_stats = device_stats;