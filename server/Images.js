const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  type:{
    type: String,
  },
  originalname:{
    type: String,
  },
  destination:{
      type: String
  }
});

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
