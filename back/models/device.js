const mongoose = require("mongoose");

const schema = mongoose.Schema;

const deviceSchema = new schema({
  name: { type: String, required: true, unique: true },
  deveui: { type: String, required: true },
  devaddr: { type: String, required: true },
  type: { type: String, required: true },
  limunosite: { type: Number },
  intensite: { type: Number },
  led: { type: Number },
  active: { type: String, default: "00" },
  id_user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  intensity_readings: [{ type: mongoose.Types.ObjectId, ref: "intensity" }],
  luminosite_readings: [{ type: mongoose.Types.ObjectId, ref: "luminosite" }],
});

module.exports = mongoose.model("device", deviceSchema);
