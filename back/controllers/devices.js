const device = require("../models/device");
const user = require("../models/user");
var spawn = require("child_process").spawn;
const { PythonShell } = require("python-shell");
//var myPythonScriptPath = "back/controllers/downloadPython.py";
//var pyshell = new PythonShell(myPythonScriptPath);

const GetAlladmin = async (req, res) => {
  const { id } = req.body;
  let existingdevice;
  try {
    existingdevice = await device.find({ id_user: id });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "success", data: existingdevice });
};

const GetAllForUser = async (req, res) => {
  const { id } = req.body;
  let existingdevice;
  try {
    existingdevice = await device.find({ id_user: id });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingdevice });
};

const GetAll = async (req, res) => {
  let existingdevice;
  try {
    existingdevice = await device.find();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingdevice });
};

const FindById = async (req, res) => {
  const { id } = req.params;

  let existingdevice;

  try {
    existingdevice = await device.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingdevice) {
    return res
      .status(500)
      .json({ success: false, message: "device doens't exist!!" });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingdevice });
};

const Updatedevice = async (req, res) => {
  const { name, deveui, devaddr, limunosite, intensite, type } = req.body;
  const { id } = req.params;

  let existingdevice;

  try {
    existingdevice = await device.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingdevice) {
    return res
      .status(500)
      .json({ success: false, message: "device doens't exist!!" });
  }

  existingdevice.name = name;
  existingdevice.deveui = deveui;
  existingdevice.devaddr = devaddr;
  existingdevice.limunosite = limunosite;
  existingdevice.intensite = intensite;
  existingdevice.type = type;

  try {
    await existingdevice.save();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res.status(200).json({
    success: true,
    message: "Device was Updated Successfully ",
    data: existingdevice,
  });
};

const Ajout = async (req, res) => {
  const { name, deveui, devaddr, limunosite, intensite, type, id_user } =
    req.body;

  let existingdevice;

  try {
    existingdevice = await device.find({ deveui: deveui });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ",
      data: error,
    });
  }

  /* if (existingdevice) {
       return res
         .status(200)
         .json({ success: false, message: "DevEUI alredy exist!!" });
     }*/
  // console.log(req.body);
  let existinguser;

  try {
    existinguser = await user.findById(id_user);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  const newdevice = new device({
    name,
    deveui,
    devaddr,
    limunosite,
    intensite,
    type,
    id_user,
  });

  try {
    await newdevice.save();
    existinguser.devices.push(newdevice);
    await existinguser.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong saving ",
      data: error,
    });
  }

  return res.status(201).json({
    success: true,
    message: `Device added successfully Mr(s) ${existinguser.prenom} `,
    data: newdevice,
  });
};

const Deletedevice = async (req, res) => {
  const { id } = req.params;

  let existingdevice;

  try {
    existingdevice = await device.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existingdevice) {
    return res
      .status(500)
      .json({ success: false, message: "device doens't exist!!" });
  }

  try {
    await existingdevice.remove();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "deleted successfully" });
};
//////////////led/////////////////////////
const GetLed = async (req, res) => {
  let existingdevice;
  try {
    existingdevice = await device.find();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existingdevice });
};

/*
function onoff(led) {
  // Decode an uplink message from a buffer
  // (array) of bytes to an object of fields.
  var decoded = {};
  // temperature
  rawTemp = bytes[2] + bytes[3] + bytes[0] + bytes[1];
  decoded.degreesC = parseInt(rawTemp, 16);
  // humidity
  rawHumid = bytes[6] + bytes[7] + bytes[4] + bytes[5];
  decoded.humidity = parseInt(rawHumid, 16);

  return decoded;
} */

const activate = async (req, res) => {
  const { active } = req.body;

  let existingdevice;

  try {
    existingdevice = await device.find();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  existingdevice.forEach(async (element) => {
    element.active = active;

    try {
      await element.save();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "something went wrong ",
        data: error,
      });
    }
  });

  return res.status(200).json({
    success: true,
    message: "Device was Updated Successfully ",
    data: existingdevice,
  });
};

const activate_device = async (re, res) => {
  /*console.log("hello");
   var process = spawn("python", ["./downloadPython.py"]);

   // Takes stdout data from script which executed
   // with arguments and send this data to res object
   process.stdout.on("data", function (data) {
     res.send(data.toString());
   });*/

  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    //   scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
    args: ["shubhamk314"], //An argument which can be accessed in the script using sys.argv[1]
  };

  PythonShell.run("./downloadPython.py", options, function (err, result) {
    console.log("result: ", result);
    res.send(result);
  });
};

exports.GetAll = GetAll;
exports.GetAllForUser = GetAllForUser;
exports.GetAlladmin = GetAlladmin;
exports.FindById = FindById;
exports.Updatedevice = Updatedevice;
exports.Ajout = Ajout;
exports.Deletedevice = Deletedevice;
exports.activate = activate;
exports.activate_device = activate_device;
