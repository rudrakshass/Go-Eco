const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.set('strictQuery', true);

userSchema = mongoose.Schema({
    first_name : {type:String, required : true},
    last_name : {type : String, required : true},
    email : {type:String, required : true, unique : true, lowercase : true},
    password : {type:String, require : true},
    points : {type : Number, default : 0},
})

userModel = mongoose.model("miniproject", userSchema);

async function startDatabase(url){
    await mongoose.connect(url).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.log("Database error\n", err);
    });
}

async function createUser(user,res){
    await userModel.create(user).then(()=>{
        res.send("<html><script>alert('Account created successfully');window.location.replace(`/login`)</script></html>")
        // res.redirect("/login");
    }).catch((err)=>{
        if(String(err.code)==="11000"){
            res.send("<html><script>alert('Account already exists');window.location.replace(`/signup`)</script></html>")
        }
    });
}

async function findUser(u_password, u_email,res,req){
    const result = await userModel.findOne().where({email : u_email});    
    if(result != null){
        bcrypt.compare(u_password, result.password, (err, check) => {
            if (check) {

                req.session.user = {
                    userid : result._id,
                    first_name : result.first_name,
                    last_name : result.last_name, 
                    points :  result.points,
                    email : result.email
                };
                req.session.authorized = true;
                res.redirect("/");
            } else {
                res.write("<html><script>alert('Invalid credentials');window.location.replace(`/login`)</script></html>");
            }
        });

    }
    else{
        res.send("<html><script>alert('User not found');window.location.replace(`/login`)</script></html>");
    }
}

async function leaderboard(req,res, callback){
    const result = await userModel.find({}, {first_name : true, _id:false, points : true}).sort({points : -1});
    callback(result);
}

async function claimPoints(charge, req,res, callback){
    await userModel.updateOne({_id : req.session.user.userid}, {$inc:{points:-charge}});
    callback();
    
}

async function profilePoints(req,res,callback){
    const points = await userModel.findOne({_id : req.session.user.userid}, {points : true, _id:false});
    callback(points);
}

module.exports = {startDatabase, createUser, findUser, leaderboard, userModel, claimPoints, profilePoints};
