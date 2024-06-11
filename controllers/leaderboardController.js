const {leaderboard} = require("../models/userModel");

function displayLeaderboard(req,res){
    leaderboard(req,res);
    // res.render("leaderboard", {isLoggedIn : req.session.authorized});
}

module.exports = {displayLeaderboard}