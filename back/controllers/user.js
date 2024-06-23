const user = require("../models/user");
const bcrypt = require("bcryptjs");
const generator = require("generate-password");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },
  auth: {
    user: "hadilayari@fsb.u-carthage.tn", // generated ethereal user'
    pass: "26072000hH", // generated ethereal password
  },
});

const register = async (req, res) => {
  const { email, password, nom, prenom, tel, adress, birthdate } = req.body;

  let avatar = "avatar.png";
  if (req.file) {
    avatar = req.file.filename;
  }
  const hashedpassword = await bcrypt.hash(password, 12);

  const newuser = new user({
    email,
    password: hashedpassword,
    nom,
    prenom,
    tel,
    adress,
    avatar,
    birthdate,
  });

  try {
    await newuser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong ", data: error });
  }

  return res.status(201).json({ message: "success", data: newuser });
};

const register_admin = async (req, res) => {
  const { email, nom, prenom, tel, adress, birthdate, status } = req.body;

  let avatar = "avatar.png";
  let password = generator.generate({
    length: 10,
    numbers: true,
  });
  console.log(password);
  const hashedpassword = await bcrypt.hash(password, 12);
  var mailOptions = {
    from: "hadilayari@fsb.u-carthage.tn",
    to: email,
    subject: " Welcome to Tech4IoT Complaints",
    text: " Welcome to Tech4IoT Complaints",

    html: `<h1 style="color: blue">AquaOptim</h1>
            <h3 style="color: black">Account Management</h3>
            <b style="color: black"> Mr(s) ${nom} ${prenom} you are welcome to use our App as an admin. and here's your credintials:<h3> votre email:</h3></b>
            <h3 style="color: #1155CC " ><u>${email}</u></h3>
            <h3 style="color: black"> Et Votre Mot de Passe est: </h3>
            <h3 style="color: #1155CC " >${password}</h3>`,
  };

  const newuser = new user({
    email,
    password: hashedpassword,
    nom,
    prenom,
    tel,
    adress,
    status,
    avatar,
    birthdate,
  });

  try {
    await newuser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res
    .status(201)
    .json({ success: true, message: "success", data: newuser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let existinguser;

  try {
    existinguser = await user.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existinguser) {
    return res
      .status(200)
      .json({ success: false, message: "user doens't exist!!" });
  }

  const check = await bcrypt.compareSync(password, existinguser.password);

  if (!check) {
    return res
      .status(200)
      .json({ success: false, message: "Password is wrong" });
  }

  return res
    .status(201)
    .json({ success: true, message: "success", data: existinguser });
};

const GetUsers = async (req, res) => {
  const { id } = req.body;
  // console.log(status);
  let existinguser;
  try {
    existinguser = await user.find({ status: id });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "success", data: existinguser });
};

const GetAll = async (req, res) => {
  let existinguser;
  try {
    existinguser = await user.find();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, messag: "success", data: existinguser });
};

const FindById = async (req, res) => {
  const { id } = req.params;
  let existinguser;

  try {
    existinguser = await user.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existinguser) {
    return res
      .status(500)
      .json({ success: false, message: "user doens't exist!!" });
  }

  return res

    .status(200)
    .json({ success: true, message: "success", data: existinguser });
};

const UpdateUser = async (req, res) => {
  const { email, nom, prenom, tel, adress, birthdate } = req.body;
  const { id } = req.params;
  console.log(res.body);
  let existinguser;

  try {
    existinguser = await user.findById(id);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong in feching",
      data: error,
    });
  }

  if (!existinguser) {
    return res
      .status(500)
      .json({ success: false, message: "user doens't exist!!" });
  }

  existinguser.email = email;
  existinguser.nom = nom;
  existinguser.prenom = prenom;
  existinguser.tel = tel;
  existinguser.birthdate = birthdate;
  existinguser.adress = adress;
  if (req.body.password) {
    existinguser.password = password;
  }

  try {
    await existinguser.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: error._message, data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "success", data: existinguser });
};

const Ajout = async (req, res) => {
  const { email, password } = req.body;

  const newuser = new user({
    email,
    password,
  });

  try {
    await newuser.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong ", data: error });
  }

  return res.status(201).json({ messag: "success", data: newuser });
};

const Deleteuser = async (req, res) => {
  const { id } = req.params;

  let existinguser;

  try {
    existinguser = await user.findById(id);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  if (!existinguser) {
    return res
      .status(500)
      .json({ success: false, message: "user doens't exist!!" });
  }

  try {
    await existinguser.remove();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong ", data: error });
  }

  return res
    .status(200)
    .json({ success: true, message: "user was deleted successfully" });
};

exports.GetUsers = GetUsers;
exports.GetAll = GetAll;
exports.FindById = FindById;
exports.UpdateUser = UpdateUser;
exports.Ajout = Ajout;
exports.Deleteuser = Deleteuser;
exports.register = register;
exports.login = login;
exports.register_admin = register_admin;
