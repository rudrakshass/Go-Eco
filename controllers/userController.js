const {createUser} = require("../models/userModel");
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

module.exports = {userSignup};