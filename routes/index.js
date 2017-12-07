var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');

let Restaurant = mongoose.model('Restaurant');
let Reactie = mongoose.model('Reactie');
let User = mongoose.model('User');

let auth = jwt({
  secret: process.env.BACKEND_SECRET,
  userProperty: 'payload'
});

// Alle restaurants tonen
router.get('/restaurants', auth, function (req, res, next) {
  let query = Restaurant.find().populate("reacties");
  query.exec(function(err, restaurants) {
    if (err) return next(err);
    res.json(restaurants);
  });
});

// Restaurant toevoegen
router.post("/restaurants", auth, function (req, res, next) {
  let restaurant = new Restaurant(req.body)
  restaurant.save(function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(restaurant);
  });
});

router.param('/restaurants', function (req, res, next, id) {
  let query = Restaurant.findById(id);
  query.exec(function (err, restaurant) {
    if (err) {
      return next(err);
    }
    if (!restaurant) {
      return next(new Error('not found ' + id));
    }
    req.restaurant = restaurant;
    return next();
  });
});

router.get('/restaurants/:restaurant', function (req, res) {
  res.json(req.restaurant);
});

// Reactie toevoegen aan restaurant
router.post('/restaurants/:id/reacties', auth, function (req, res, next) {
  let reactie = new Reactie({
    user: req.payload._id,
    restaurant: req.params.id,
    tekst: req.body.tekst,
    score: req.body.score
  });
  console.log(reactie);

  Restaurant.findByIdAndUpdate({_id: req.params.id}, 
    {$inc: {totaleScore: req.body.score, aantalBeoordelingen: 1}, $addToSet: {reacties: reactie}},
    {new: true},
  function(err, restaurant){
    if(err) {return next(err)}
    User.findByIdAndUpdate(req.payload._id, {$addToSet: {beoordeeldeRestaurants: req.params.id}}, function(err, user){
      if(err) {return next(err)}
      reactie.save(function (err, reactie) {
        if (err) { return next(err); }
        res.json(reactie);
      })
    });
  });

})

module.exports = router;