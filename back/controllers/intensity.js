const intensity = require('../models/intensity');
const device = require('../models/device');
const moment = require('moment');


const GetAll = async (req, res) => {

    let existingintensity;
    try {
        existingintensity = await intensity.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, messag: 'success', data: existingintensity});
}

const FindById = async (req, res) => {

    //const {id} = req.params;

    let existingintensity;

    try {
        existingintensity = await intensity.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingintensity) {
        return res.status(500).json({success: false, message: "intensity doens't exist!!"});
    }

    return res.status(200).json({success: true, messag: 'success', data: existingintensity});
}

const Updateintensity = async (req, res) => {

    const { val_intensity, date, id} = req.body;
   // const {id} = req.params;

    let existingintensity;

    try {
        existingintensity = await intensity.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingintensity) {
        return res.status(500).json({success: false, message: "intensity doens't exist!!"});
    }
    
    existingintensity.val_intensity = val_intensity;
    existingintensity.date = date;
    
   

    try {
        await existingintensity.save();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, messag: 'Updated Successfully ', data: existingintensity});

}

const Ajout = async (req, res) => {

    const { val_intensity, id_device } = req.body;

    const full_date = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
    const date = moment(new Date()).format('DD/MM');

    const newintensity = new intensity({
        val_intensity,
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
        await newintensity.save();
        existingdevice.intensity_readings.push(newintensity);
        await existingdevice.save();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong while saving ", data: error});
    }

    return res.status(201).json({success: true, messag: 'success', data: newintensity});
}

const Deleteintensity = async (req, res) => {
 
    const {id} = req.params;

    let existingintensity;

    try {
        existingintensity = await intensity.findById(id);
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existingintensity) {
        return res.status(500).json({success: false, message: "intensity doens't exist!!"});
    }

    try {
        await existingintensity.remove();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'deleted successfully'});

}


const device_stats = async (req, res) => {

    const { id } = req.body;


  
    let readings;
    try {
        readings = await intensity.find({ id_device: id }).
        limit(7).
        select({date: 1, val_intensity: 1});

    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }
    
    return res.status(200).json({success: true, message: "success ", data: readings});
}

exports.device_stats = device_stats;
exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Updateintensity = Updateintensity;
exports.Ajout = Ajout;
exports.Deleteintensity = Deleteintensity;


