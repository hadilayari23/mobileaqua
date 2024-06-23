const express = require("express");
const userController = require("../controllers/user");
const OssController = require("../controllers/oss");
const fileuploader = require("../MiddleWare/UploadFiles");
const route = express.Router();

route.get("/", userController.GetAll);

route.post("/oss", OssController.GetAll);

route.post("/", userController.GetUsers);

route.get("/:id", userController.FindById);

route.patch("/:id", userController.UpdateUser);

route.delete("/:id", userController.Deleteuser);

route.post("/add", userController.Ajout);

route.post("/register", fileuploader.single("avatar"), userController.register);

route.post("/login", userController.login);

route.post("/admin_register", userController.register_admin);
// route.post('/login', (req, res) => {

//     return res.status(200).json({message: "success", data: req.body})
// });

module.exports = route;
