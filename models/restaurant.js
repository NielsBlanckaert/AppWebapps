var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name: String,
  locatie: String,
  beoordeling: Number,
});	
mongoose.model('Restaurant', RestaurantSchema)