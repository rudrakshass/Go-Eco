const express = require("express");
const path = require("path");

//controllers
//modules

//declarations
const app = express();
const PORT = 8080;



//middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, '/public')));

//setting up rendering engine
app.set("view engine", "ejs");

//routings

//get requests
app.get("/", (req,res)=>{res.render("index")})
app.get("/getpoints", (req,res)=>{res.render("getpoints")});
app.get("/leaderboard", (req,res)=>{res.render("leaderboard")});
app.get("/tasks", (req,res)=>{res.render("tasks")});

//server instance
app.listen(PORT, ()=>{console.log(`Server started on PORT ${PORT}`)});