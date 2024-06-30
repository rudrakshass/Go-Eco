const {leaderboard} = require("../models/userModel");

function displayLeaderboard(req,res){
    leaderboard(req,res, (result)=>{
        res.render("leaderboard", {isLoggedIn : req.session.authorized, result : result});
    });
}

module.exports = {displayLeaderboard}
