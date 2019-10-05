require('dotenv').config()

//require packages
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose");

//connect to database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});

//set up for all templates and routes to use these
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Routes-----------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render("index");
});



//Tell server to listen to port 3000-------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Portfollio Server Is On");
});
