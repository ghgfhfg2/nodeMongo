const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  date: {
    type: Number,
  },
  day: {
    type: String,
  },
  check: {
    type: String,
  },
});

const Check = mongoose.model("Check", checkSchema);

module.exports = { Check };
