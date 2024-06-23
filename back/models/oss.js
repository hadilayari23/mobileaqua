
const mongoose = require("mongoose");
const schema = mongoose.Schema;

module.exports = mongoose.model(
  "ioT1",
  new schema({
    url: String,
    Time: String,
    payload_hex: String,
    DevEUI: String,
    deveui: { type: String, required: true, ref: "device" },
  }),
  "IoT1"
);
