var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [{
    name: "Cloud's Rest",
    image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie semper nunc, nec congue magna. Integer et tristique nunc. Quisque venenatis lectus non consequat maximus. Nulla porta nunc risus, sed tempus leo congue vel. Proin efficitur condimentum consectetur. Sed quis aliquam sapien, id vulputate libero. Aliquam fermentum, arcu vel commodo imperdiet, nunc metus vestibulum diam, nec pulvinar libero mi porta dolor. Nam facilisis et urna eu molestie. In blandit ut justo a lacinia. Sed quis lacinia nisl, nec condimentum augue. Maecenas laoreet lobortis tortor, vel pharetra sapien vehicula a. Etiam ornare dui a lectus vulputate suscipit."
},
{
    name: "Desert Safari",
    image: "https://c2.staticflickr.com/8/7066/27197030585_1e632044ff_z.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie semper nunc, nec congue magna. Integer et tristique nunc. Quisque venenatis lectus non consequat maximus. Nulla porta nunc risus, sed tempus leo congue vel. Proin efficitur condimentum consectetur. Sed quis aliquam sapien, id vulputate libero. Aliquam fermentum, arcu vel commodo imperdiet, nunc metus vestibulum diam, nec pulvinar libero mi porta dolor. Nam facilisis et urna eu molestie. In blandit ut justo a lacinia. Sed quis lacinia nisl, nec condimentum augue. Maecenas laoreet lobortis tortor, vel pharetra sapien vehicula a. Etiam ornare dui a lectus vulputate suscipit. "
},
{
    name: "Canyon floor",
    image: "https://media.pitchup.co.uk/images/4/image/private/s--h0QzLUz0--/c_limit,h_1350,w_1800/e_improve,fl_progressive/q_50/b_rgb:000,g_south_west,l_pu_logo_white_vcbkgt,o_25/v1403015406/eisteddfa-caravan-and-camping-site/eisteddfa-caravan-and-camping-site-5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie semper nunc, nec congue magna. Integer et tristique nunc. Quisque venenatis lectus non consequat maximus. Nulla porta nunc risus, sed tempus leo congue vel. Proin efficitur condimentum consectetur. Sed quis aliquam sapien, id vulputate libero. Aliquam fermentum, arcu vel commodo imperdiet, nunc metus vestibulum diam, nec pulvinar libero mi porta dolor. Nam facilisis et urna eu molestie. In blandit ut justo a lacinia. Sed quis lacinia nisl, nec condimentum augue. Maecenas laoreet lobortis tortor, vel pharetra sapien vehicula a. Etiam ornare dui a lectus vulputate suscipit. "
}];

function seedDB(){
    //remove campgrounds
    Campground.remove({},function (err) {
    if(err){
        console.log(err)
    }else{
        console.log("Deleted campgrounds");
    }
});

    //add new campgrounds
    data.forEach(function(seed){
    Campground.create(seed,function (err,campground) {
        if(err){
            console.log(err);
        }else{
        console.log("Added Campground");
        //Comment 
        Comment.create({
            text: "This place is good",
            author: "Dheeraj"
        },function (err,comment) {
            if(err){
                console.log(err);
            }else{
                //add username and id to comment
                console.log(req.user.username);
    
                campground.comments.push(comment);
                campground.save();
                console.log("Created a new comment");
            }
        })
        }
    })
    })
}
module.exports = seedDB;
