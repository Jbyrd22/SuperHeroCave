require('dotenv').config();

const express = require("express"),
      router = express.Router({mergeParams: true}),
      request = require("request"),
      rp = require("request-promise");

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

  for(var i = 0; i < 9; i++){
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

//hero show route
router.get("/heroes/show", async (req, res) => {
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

module.exports = router;
