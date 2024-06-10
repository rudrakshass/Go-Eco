const mongoose = require("mongoose");

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
        res.write("<html><script>alert('Account created successfully')</script></html>")
        res.redirect("/login");
    }).catch((err)=>{
        if(String(err.code)==="11000"){
            res.send("<html><script>alert('Account already exists');window.location.replace(`/signup`)</script></html>")
        }
    });
}

module.exports = {startDatabase, createUser};