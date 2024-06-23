const consm = require('../models/consm');

const moment = require('moment');

const GetAll = async (req, res) => {

    let existingconsm;
    try {
        existingconsm = await consm.find();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existingconsm});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existingconsm;

    try {
        existingconsm = await consm.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingconsm) {
        return res.status(500).json({message: "consm doens't exist!!"});
    }

    return res.status(200).json({messag: 'success', data: existingconsm});
}

const Ajout = async (req, res) => {

    const { intensite, problem, iduser } = req.body;

    let today = new date();
    const newconsm = new consm({
      consm,
      date: moment(today).format("DD-MM-YYYY"),
      time: moment(today).format("h:mm:ss a"),
    });

    try {
        await newconsm.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({messag: 'success', data: newconsm});
}

const Deleteconsm = async (req, res) => {
 
    const {id} = req.params;

    let existingconsm;

    try {
        existingconsm = await consm.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingconsm) {
        return res.status(500).json({message: "consm doens't exist!!"});
    }

    try {
        await existingconsm.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

const Chart = async (req, res) => {
 
    

    let existingconsm;

    try {
        existingconsm = await consm.aggregate([
            {
              $group: {
                date: "$date",
                count: {
                  $sum: "$sum_consm"
                }
              }
            }
        ])
        // existingconsm = await consm.find({}).select('intensite');
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existingconsm) {
        return res.status(500).json({message: "consm doens't exist!!"});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

exports.GetAll = GetAll;
exports.FindById = FindById;
exports.Ajout = Ajout;
exports.Deleteconsm = Deleteconsm;
exports.Chart = Chart;