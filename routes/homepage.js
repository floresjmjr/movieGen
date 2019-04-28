//Router
var express = require('express');
var router = express.Router();

//Modules
const Homepage = require('../modules/homepage')


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get / request')
  res.render('homepage', {
    title: 'movieGen',
  });
});

// GET request for movie data for homepage
router.get('/movies', (req, res, next)=>{
  console.log('get /movies request')
  Homepage.getMovieLists()
  .then((movieLists)=>{
    var categoryCollection = {};
    categoryCollection.trending = movieLists[0];
    categoryCollection.latest = movieLists[1];
    categoryCollection.topRated = movieLists[2];
    res.send(categoryCollection);
  })
});


module.exports = router;


