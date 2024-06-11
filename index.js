//server constants
const express = require("express");
const session = require("express-session");
const path = require("path");

//database constants
const {startDatabase} = require("./models/userModel");
connection_url = "mongodb://localhost:27017/";

//controllers
const {userSignup,userLogin, IsUserLogin} = require("./controllers/userController");
const {displayLeaderboard} = require("./controllers/leaderboardController");
//modules

//declarations
const app = express();
const PORT = 8080;



//middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

//setting up rendering engine
app.set("view engine", "ejs");

//routings below

//get requests
app.get("/", (req,res)=>{res.render("index",{isLoggedIn : req.session.authorized})});
app.get("/getpoints", (req,res)=>{res.render("getpoints", {isLoggedIn : req.session.authorized})});
app.get("/leaderboard", displayLeaderboard);
app.get("/tasks", (req,res)=>{res.render("tasks", {isLoggedIn : req.session.authorized})});
app.get("/faq", (req,res)=>{res.render("faq", {isLoggedIn : req.session.authorized})});
app.get("/rewards", IsUserLogin);
app.get("/login", (req,res)=>{res.render("login")});
app.get("/signup", (req,res)=>{res.render("signup")});
app.get("/profile", (req,res)=>{res.send("This is profile page")});

//post requests
app.post("/login", userLogin);
app.post("/signup",userSignup);

//database connection
startDatabase(connection_url).then(()=>{
    //server instance
    app.listen(PORT, ()=>{console.log(`Server started on PORT ${PORT}`)});
})
// app.listen(PORT, ()=>{console.log(`Server started on PORT ${PORT}`)});


