require('dotenv').config()

//require packages
const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      rp = require("request-promise"),
      mongoose = require("mongoose"),
      flash = require("connect-flash"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"), 
      expressSession = require("express-session"),
      User = require("./models/user");

//requiring routes
const heroRoutes = require("./routes/heroes"),
	  	myHeroRoutes = require("./routes/myHeroes"),
      authRoutes = require("./routes/auth"); 


//connect to database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true});

//set up for all templates and routes to use these
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());//must come before passport configuration!!!

//==========================================================================
//Passport configuration
//===========================================================================

app.use(expressSession({
  secret: process.env.PASSPORT, 
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this allows the req.user data to be passed to every route and template under the name 'currentUser'.
//this allows currentUser and message to be used on every route/template automatically
app.use((req, res, next) => {
	res.locals.currentUser = req.user;//current user object for authentication
	res.locals.error = req.flash("error");//flash message
	res.locals.success = req.flash("success");//flash message
	next();
});

//==========================================================================


app.use(heroRoutes);
app.use(authRoutes);
app.use(myHeroRoutes);


//Tell server to listen to port 3000-------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("SuperHeroCave Server Is On");
});
