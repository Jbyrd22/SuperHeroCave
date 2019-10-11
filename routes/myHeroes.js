require('dotenv').config();

const express = require("express"),
      router = express.Router({mergeParams: true}),
      Hero = require("../models/hero.js");


//All created heroes
router.get("/myHeroes", async (req, res) => {
  let myHeroes = await Hero.find({})
  res.render("myHeroes/myHeroes", {myHeroes: myHeroes})
});

//new route
router.get('/myHeroes/new', (req, res) => {
  res.render("myHeroes/newHero");
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
    res.render("myHeroes/showMyHero", {hero: hero});
  } catch(error) {
    console.log(error);
  }
});

//edit route
router.get("/myHeroes/:id/edit", async (req, res) => {
  try {
    let hero = await Hero.findById(req.params.id);
    res.render("myHeroes/edit", {hero: hero});
  } catch(err) {
    console.log(err);
  }
});

//update route
router.put("/myHeroes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let hero = req.body.hero;
    let updatedHero = await Hero.findByIdAndUpdate(id, hero);
    res.redirect(`/myHeroes/${id}`);
  } catch(err) {
    console.log(err);
  }
});

//delete route
router.delete("/myHeroes/:id", async (req, res) => {
  try {
    await Hero.findOneAndDelete({_id: req.params.id});
    res.redirect("/myHeroes");
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;
