const mongoose = require("mongoose");
const schema = mongoose.Schema;

const deviceSchema = new schema({
  IDdevice: { type: String, require: true },
  devactivation: { type: String },
  devEUI: { type: String },
  devaddr: { type: String },
});
module.exports = mongoose.model("Devices", deviceSchema);
