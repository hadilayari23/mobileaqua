const mongoose = require('mongoose');

const schema = mongoose.Schema;

const consmSchema = new schema ({
 
    consm:{type: Number, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
})

module.exports = mongoose.model('consm', consmSchema);