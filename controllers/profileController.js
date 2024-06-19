function displayProfile(req,res){
    userdetails = req.session.user;
    res.render("profile", {isLoggedIn : req.session.authorized, user : userdetails});
}

function logout(req,res){
    req.session.destroy();
    res.redirect("/login");
}

module.exports = {displayProfile, logout};