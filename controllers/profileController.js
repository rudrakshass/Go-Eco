const {profilePoints} = require("../models/userModel");

function displayProfile(req,res){
    profilePoints(req,res);
}

function logout(req,res){
    req.session.destroy();
    res.redirect("/login");
}

module.exports = {displayProfile, logout};