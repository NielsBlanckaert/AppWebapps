var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name: String,
  locatie: String,
  totaleScore: Number,
  aantalBeoordelingen: Number,
  reacties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reactie'
  }]
});

mongoose.model('Restaurant', RestaurantSchema)