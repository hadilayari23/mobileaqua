const OSS_LRR_v1 = require("../models/oss");

const { Result } = require("express-validator");
const moment = require("moment");

const GetAll = async (req, res) => {
  const { DevEUI } = req.body;
  let existingoss;
  let final = [];
  console.log(DevEUI);
  // let DevEUI ='2422222222222224';
  // let DevEUI ='343437315236840E';
  try {
    existingoss = await OSS_LRR_v1
      .find({ DevEUI: DevEUI })
      .select({ payload_hex: 1, _id: 0, Time: 1 });

    for (let i = 0; i < existingoss.length; i++) {
      //  console.log(existingoss[i]);
      //  console.log(Decoder(existingoss[i].payload_hex));
      let data = Decoder(existingoss[i].payload_hex);
      final.push({
        Time: moment(existingoss[i].Time).format("DD-MM-YYYY HH:mm:ss"),
        temperature: data.degreesC,
        humidity: data.humidity,
      });
    }
    //  try {
    //    existingoss = await IoT1.find(
    //      { deveui: DevEUI },
    //      { payload_hex: 1, _id: 0 }
    //    ).distinct("payload_hex");
    //    for (let i= 0; i < existingoss.length; i++) {
    //    console.log(existingoss[i]);
    //   //  console.log(Decoder(existingoss[i]));
    //    }
       //{ _id: ObjectId("629202481f034abc327c1f24") }, { username: 1 },DevEUI
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: final });
    // .json({ success: true, messag: "success", data: existingoss });
};

function Decoder(bytes) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var decoded = {};
  // temperature
  rawTemp = bytes[2] + bytes[3] + bytes[0] + bytes[1];
  decoded.degreesC = parseInt(rawTemp, 16) 
  // humidity
  rawHumid = bytes[6] + bytes[7] + bytes[4] + bytes[5];
  decoded.humidity = parseInt(rawHumid, 16) ;

  return decoded;
}
 

exports.GetAll = GetAll;