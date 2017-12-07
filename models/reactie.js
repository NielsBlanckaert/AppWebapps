var mongoose = require('mongoose');

var ReactieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  tekst: String,
  datum: {
    type: Date,
    default: Date.now
  },
  score: {type: Number, default: 0}
});

mongoose.model('Reactie', ReactieSchema)