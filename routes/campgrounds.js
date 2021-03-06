var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//================
//CAMPGROUND ROUTES
//================


router.get("/",function(req, res) {
    //Get all campgrounds and then render
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds: allCampgrounds});
        }
    })
});

router.post("/",isLoggedIn,function(req,res){
    //get data from form and add to campgrounds
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author };
    //create new Camoground and save to DB
    
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    })
    //redirect to campgrounds
});

router.get("/new",isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
})
//=======================
//SHOW SELECTED CAMPGROUND
//=======================
router.get("/:id",function(req, res) {
    //find campground with selected id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("error" + err);
        }
        else{
    //render show template with that campground
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
            }
    });
});

//================
//EDIT
//================

router.get("/:id/edit",isLoggedIn,function(req, res) {
    Campground.findById(req.params.id, function (err,foundCampground) {
        if(err){
            console.log(err);
        }else{
    res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
})


//================
//UPDATE
//================

router.put("/:id",isLoggedIn,function (req,res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err,updatedCampground) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
