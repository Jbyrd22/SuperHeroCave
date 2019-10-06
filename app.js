require('dotenv').config()

//require packages
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      rp = require("request-promise"),
      mongoose = require("mongoose");

//connect to database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});

//set up for all templates and routes to use these
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//route functions

function makeArray(){
  let arr = [];
  for(var i = 0; i < 5; i++){
    arr.push(Math.floor(Math.random() * 731) + 1)
  }
  return arr;
}

//Hero Routes-----------------------------------------------------------------------------------
app.get('/', (req, res) => {
  res.render("index");
});

//Display heroes route
app.get('/heroes', async (req, res) => {
  let randNumArray = makeArray();
  let heroes = [];

  for(var i = 0; i < 5; i++){
    let options = {
      url: `https://superheroapi.com/api/2422705334455544/${randNumArray[i]}`,
      method: "GET",
      json: true
    }
    let hero = await rp(options);
    heroes.push(hero);
  }

  res.render("heroes", {heroes: heroes});
});

//search for a heroes
app.get('/heroes/search', async (req, res) => {
  res.render("search");
});

//hero show route
app.get("/heroes/show", async (req, res) => {
    let name = req.query.name;
    let options = {
      url: `https://superheroapi.com/api/2422705334455544/search/${name}`,
      method: 'GET',
      json: true
    }

    let hero = await rp(options);

    if(hero.response == 'error'){
      console.log(hero.error);
      res.redirect('/heroes/search');
    } else {
      res.render("show", {heroes: hero.results});
    }
});


//Tell server to listen to port 3000-------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("SuperHeroCave Server Is On");
});
