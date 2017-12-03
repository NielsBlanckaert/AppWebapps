var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name: String,
  locatie: String,
  beoordeling: number
});	
mongoose.model('Restaurant', RecipeSchema)