const mongoose = require("mongoose");

const schema = mongoose.Schema;

const luminositeSchema = new schema({
  val_luminosite: { type: Number, required: true },
  full_date: { type: String, required: true },
  date: { type: String, required: true },
  id_device: { type: mongoose.Types.ObjectId, required: true, ref: "device" },
});

module.exports = mongoose.model("luminosite", luminositeSchema);
