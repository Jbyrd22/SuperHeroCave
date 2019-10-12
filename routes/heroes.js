require('dotenv').config();

const express = require("express"),
      router = express.Router({mergeParams: true}),
      request = require("request"),
      rp = require("request-promise"),
      Hero = require("../models/hero");

//function for hero routes
function makeArray(){
  let arr = [];
  for(var i = 0; i < 9; i++){
    arr.push(Math.floor(Math.random() * 731) + 1)
  }
  return arr;
}

//Display heroes route
router.get('/heroes', async (req, res) => {
  let randNumArray = makeArray();
  let heroes = [];
  try {
    for(var i = 0; i < 9; i++){
      let options = {
        url: `https://superheroapi.com/api/2422705334455544/${randNumArray[i]}`,
        method: "GET",
        json: true
      }
      let hero = await rp(options);
      heroes.push(hero);
    }
    res.render("hero/heroes", {heroes: heroes});
  } catch(err) {
    console.log(err);
  }

});

//hero search route
router.get("/heroes/show", async (req, res) => {

  if(req.query.name) {
    let name = req.query.name;

    let options = {
      url: `https://superheroapi.com/api/2422705334455544/search/${name}`,
      method: 'GET',
      json: true
    }

    try {
      let hero = await rp(options);
      if(hero.response == 'error') throw hero.error;
      res.render("hero/show", {heroes: hero.results});
    } catch(err) {
      console.log(err);
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }
});

//hero show route
router.get("/heroes/:id", async (req, res) => {
  let options = {
    url: `https://superheroapi.com/api/2422705334455544/${req.params.id}`,
    method: 'GET',
    json: true
  }

  try {
    let heroes = [];
    let hero = await rp(options);
    heroes.push(hero);
    res.render("hero/show", {heroes: heroes});
  } catch(err) {
    console.log(err);
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
