function getpointsPage(req,res){
    if(req.session.authorized){
        res.render("getpoints", {isLoggedIn : req.session.authorized});
    }
    else{
        res.redirect("/login");
    }
}

module.exports = {getpointsPage};