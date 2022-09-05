var express = require('express');
var router = express.Router();
var request = require("sync-request");
// var villeModel = require("./bdd");

var villeModel = require("../models/cities");
var userModel = require("../models/users");

let errorMsg = ""
let cityList=[]

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'WeatherApp' });
});

router.get('/weather',async function(req, res, next) {
        let cityList = await villeModel.find()
        if(req.session.user){
  res.render('weather', { title: 'WeatherApp',cityList, errorMsg })
        } else {
  res.redirect("/")        
        }
});

router.post('/add-city',async function(req, res, next) {

    var dataAPI = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+req.body.name+"&appid=f12aa396c2e25f258328c84486c47f46&lang=fr&units=metric")
    dataAPI = JSON.parse(dataAPI.body)
    // console.log(dataAPI)
    if(cityList.find(elt => elt.name.toLowerCase() == req.body.name.toLowerCase()) == undefined && dataAPI.cod !== "404"){

    let newCity = new villeModel ({
      name: req.body.name, 
      temps: dataAPI.weather[0].description,
      picto: "http://openweathermap.org/img/wn/" + dataAPI.weather[0].icon + "@2x.png",
      tMin: dataAPI.main.temp_min,
      tMax: dataAPI.main.temp_max,
      lat: dataAPI.coord.lat,
      lon: dataAPI.coord.lon
    })
    var citySaved = await newCity.save()
    cityList = await villeModel.find()
    errorMsg =""
  
    } else {
      errorMsg = "Ville non trouvée ou déjà affichée"
    }
    // console.log(cityList)
    // console.log(dataAPI)
    res.render('weather', { title: 'WeatherApp', cityList:cityList, name: req.body.name ,dataAPI, errorMsg});
});

router.get('/delete-city',async function(req, res, next) {
  // console.log(req.query.name)
  // cityList.splice(req.query.ligne,1)
  await villeModel.deleteOne({name: req.query.name});
  cityList = await villeModel.find()
  // console.log(cityList)

  res.render('weather', { title: 'WeatherApp', cityList, name: req.query.name,errorMsg });
});

router.get("/update-data", async function(req,res) {
  cityList = await villeModel.find()
  
  for(let i=0; i<cityList.length;i++) {
    var dataAPI = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+cityList[i].name+"&appid=f12aa396c2e25f258328c84486c47f46&lang=fr&units=metric")
    dataAPI = JSON.parse(dataAPI.body)
    // console.log(dataAPI)
    await villeModel.updateMany(
      { name: cityList[i].name},
      { temps: dataAPI.weather[0].description, picto: cityList[i].picto, tMin: dataAPI.main.temp_min, tMax: dataAPI.main.temp_max}
     );
  }

  cityList = await villeModel.find()

  res.render("weather", {dataAPI, cityList,errorMsg} )
})

module.exports = router;
