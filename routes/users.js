var express = require('express');
var router = express.Router();
var request = require("sync-request");
// var villeModel = require("./bdd");

var villeModel = require("../models/cities");
var userModel = require("../models/users");

let errorMsg = ""
let cityList=[]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/sign-up",async function(req,res) {
  let exist = await userModel.findOne({email: req.body.email})
  if(exist){
    res.render("login")
  } else {
    let newUser = new userModel ({
      username: req.body.username, 
      email: req.body.email, 
      password: req.body.password
    })
    var userSaved = await newUser.save() 

    if (userSaved) {
      req.session.user = { 
        username :userSaved.username, 
        id: userSaved._id
      }
    }
    
  res.redirect("/weather");
  }
})

router.get("/logout", function(req,res) {
  req.session.user = null
  // console.log(req.session.user)
  res.redirect("/")
})


router.post("/sign-in",async function(req,res) {
  let exist = await userModel.findOne({email: req.body.email, password: req.body.password })
  // console.log(exist)
  if(exist) {
    req.session.user = {
      username: exist.username,
      id: exist._id
         }
    res.redirect("/weather");
    console.log("salut")
  } else {
    res.render("login");
    console.log("jarivpas")
  }

  if(exist){
    req.session.user = {
      username: exist.username,
      id: exist._id
      
    }
  }
  
})



module.exports = router;
