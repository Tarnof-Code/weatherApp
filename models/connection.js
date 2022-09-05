var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://Tarnof:AaN7sE8DF3eECOxx@cluster0.hzty7.mongodb.net/weatherapp?retryWrites=true&w=majority', options,        
    function(err) {
      console.log(err);
    }
   );