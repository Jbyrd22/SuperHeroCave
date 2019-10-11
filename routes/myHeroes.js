require('dotenv').config();

const express = require("express"),
      router = express.Router({mergeParams: true}),
      Hero = require("../models/hero.js");

// let newHero = {
//   name: "Lyla",
//   height: "3.9",
//   weight: 35,
//   alignment: "good",
//   birthPlace: "Louisville, Ky",
//   gender: "Female",
//   race: "Human",
//   relatives: "Erica Crask(mother), Jason Crask(father), Axcel Crask(brother)",
//   image: "images/lyla.jpg"
// }
//
// Hero.create(newHero)
//   .then(hero => console.log(hero))
//   .catch(err => console.log(err));

//All created heroes
router.get("/myHeroes", async (req, res) => {
  let myHeroes = await Hero.find({})
  res.render("myHeroes", {myHeroes: myHeroes})
});

//new route
router.get('/myHeroes/new', (req, res) => {
  res.render("newHero");
});

//create route
router.post("/myHeroes", async (req, res) => {
  await Hero.create(req.body.hero);
  res.redirect('/myHeroes');
});

//show route
router.get("/myHeroes/:id", async (req, res) => {
  try {
    let heroId = req.params.id;
    let hero = await Hero.findById(heroId);
    res.render("showMyHero", {hero: hero});
  } catch(error) {
    console.log(error);
  }

});

//edit route
router.get("/myHeroes/edit", async (req, res) => {
  res.render()
});

module.exports = router;
