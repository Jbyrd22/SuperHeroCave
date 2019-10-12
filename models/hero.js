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
  image: String,
  author:
	{
		id:
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
