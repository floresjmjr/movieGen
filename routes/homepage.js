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
    categoryCollection.topRated = movieLists[1];
    categoryCollection.latest = movieLists[2];
    categoryCollection.trending.push(...movieLists[3])
    categoryCollection.topRated.push(...movieLists[4])
    categoryCollection.latest.push(...movieLists[5])

    res.send(categoryCollection);
  })
});


module.exports = router;


