const {profilePoints} = require("../models/userModel");

function displayProfile(req,res){
    profilePoints(req,res, (points)=>{
        userdetails = req.session.user;
        res.render("profile", {isLoggedIn : req.session.authorized, user : userdetails, points : points.points});
    });
}

function logout(req,res){
    req.session.destroy();
    res.redirect("/login");
}

module.exports = {displayProfile, logout};