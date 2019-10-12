require('dotenv').config();

const express = require("express"),
      router = express.Router({mergeParams: true}),
      passport = require("passport"),
      User = require("../models/user");


//landing page
router.get('/', (req, res) => {
  res.render("index");
});

//Authorization Routes======================================================================================

//register form route
router.get("/register", (req, res) => {
	res.render("register");
});

//creating a new user
router.post("/register", async (req, res) => {
  try {
    let newUser = new User({username: req.body.username});
    if(req.body.adminCode === process.env.SECRET_CODE) {
      newUser.isAdmin = true;
    }
    await User.register(newUser, req.body.password);
    await passport.authenticate("local")(req, res, () => {
      //req.flash goes here
      res.redirect("/heroes");
    });
  } catch(err) {
    console.log(err);
    //req.flash goes here
    res.redirect("back");
  }
});

//login form
router.get("/login", (req, res) => {
	res.render("login");
});

//post route to login
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/heroes",
		failureRedirect: "/login"
	}), (req, res) => {});

//logout route
router.get("/logout", (req, res) => {
	req.logout();
	//req.flash("success", "Logged You Out");
	res.redirect("/heroes");
});


//==========================================================================================================

module.exports = router;
