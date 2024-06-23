const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema ({
    email: {type: String, required: true, unique: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    tel: {type: String, required: true},
    adress: {type: String, required: true},
    birthdate: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: String,},
    avatar: {type: String, required: true},
    devices: [{type: mongoose.Types.ObjectId, required: true, ref: "device" }],
    users: [{type: mongoose.Types.ObjectId, required: true, ref: "user" }],
})

module.exports = mongoose.model('user', userSchema);