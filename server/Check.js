const mongoose = require("mongoose");

const checkSchema = mongoose.Schema({
  id:{
    type: String,
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
  comment: {
    type: String,
  },
});

const Check = mongoose.model("Check", checkSchema);

module.exports = { Check };
