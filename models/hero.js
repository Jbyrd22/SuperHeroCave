const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: String,
  height: String,
  weight: Number,
  alignment: String,
  birthPlace: String,
  gender: String,
  race: String,
  relatives: String,
  image: String
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
