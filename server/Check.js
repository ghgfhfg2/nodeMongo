const mongoose = require("mongoose");

const checkSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    trim: true,
  },
  date: {
    type: Number,
  },
  check: {
    type: String,
  },
});

const Check = mongoose.model("Check", checkSchema);

module.exports = { Check };
