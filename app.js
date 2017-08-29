var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
//Seed Database //seedDB(); //To seed the database with demo values

//==============
//MONGOOSE CONFIG
//===============
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

//==============
//PASSPORT CONFIG
//==============
app.use(require("express-session")({
    secret: "Dheeraj Lalwani",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================
//OTHER APP CONFIG
//================

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname,+"/public"));
app.use(methodOverride("_method"));
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp server has started");
});