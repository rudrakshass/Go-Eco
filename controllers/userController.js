const {createUser, findUser} = require("../models/userModel");
const bcrypt = require("bcrypt")

async function userSignup(req,res){
    if(req.body.password != req.body.c_password){
        res.send("<html><script>alert('Passwords do not match');window.location.replace(`/signup`)</script></html")
        return;
    }
    const hashed_password = await bcrypt.hash(req.body.password, 10)
    user = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : hashed_password,        
    }
    createUser(user,res);
}

function IsUserLogin(req,res){
    if(req.session.authorized){
        res.render("rewards", {isLoggedIn : req.session.authorized})
    }
    else{
        res.redirect("/login");
        
    }
}

function userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    findUser(password, email,res,req);
}

module.exports = {userSignup, userLogin, IsUserLogin};