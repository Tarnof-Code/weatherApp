var mongoose = require('mongoose');

let villeSchema = mongoose.Schema({
    name: String, 
    temps: String, 
    picto: String,
    tMin: Number,
    tMax: Number,
    lat: Number,
    lon: Number
 });

 let villeModel = mongoose.model("villes" , villeSchema)

 module.exports = villeModel;