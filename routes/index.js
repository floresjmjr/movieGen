var express = require('express');
var router = express.Router();
var request = require('request')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get / request')
  res.render('index', {
    title: 'Hello World',
  });
});

router.get('/movies', (req, res, next)=>{
  console.log('get /movies request')
  var movies = {};
  new Promise((resolve, reject)=>{
    var encodedPath = 'https://api.themoviedb.org/3/trending/movie/week?api_key=372fa67260808fa002d6f3471d8dc7b3'
    request(encodedPath, (error, response, body)=>{
      var rawBody =JSON.parse(body);
      movies.trending = rawBody.results;
      console.log('trending', movies.trending.length);
      resolve(movies);
    })
  }).then(()=>{
    console.log('latest Start')
    var encodedPath = 'https://api.themoviedb.org/3/discover/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2019-04-06&vote_count.gte=500'
    request(encodedPath, (error, response, body)=>{
      var rawBody = JSON.parse(body);
      movies.latest = rawBody.results
      console.log('latest', movies.latest.length)
    })
    return movies;
  }).then(()=>{
    console.log('topRated Start')
    var encodedPath = 'https://api.themoviedb.org/3/discover/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=7'
    request(encodedPath, (error, response, body)=>{
      var rawBody = JSON.parse(body);
      movies.topRated = rawBody.results
      console.log('latest', movies.topRated.length)
      res.send(movies)
    })
  })
});



// router.get('/results', function(req, res, next) {
  // var encodedQuery = 'shadowlands'; 
  // var encodedPath = `https://api.themoviedb.org/3/search/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&query=${encodedQuery}&page=1`
  // request(encodedPath, (error, response, body)=>{
  //   var rawBody =JSON.parse(body);
  //   res.render('index', {
  //     movieArr: rawBody.results,
  //   });
  // })
// });




module.exports = router;
