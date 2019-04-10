var express = require('express');
var router = express.Router();
var request = require('request')
var path = require('path');

var List = require(path.resolve(path.dirname(__dirname), './modules/list.js'))

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get / request')
  res.render('index', {
    title: 'movieGen',
  });
});

router.get('/movies', (req, res, next)=>{
  console.log('get /movies request')
  new Promise((resolve, reject)=>{
    var movies = {};
    var encodedPath = 'https://api.themoviedb.org/3/trending/movie/week?api_key=372fa67260808fa002d6f3471d8dc7b3'
    request(encodedPath, (error, response, body)=>{
      var rawBody =JSON.parse(body);
      movies.trending = rawBody.results;
      console.log('trending', movies.trending.length);
      resolve(movies);
    })
  }).then((movies)=>{
    console.log('latest Start')
    var encodedPath = 'https://api.themoviedb.org/3/discover/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2019-04-06&vote_count.gte=500'
    return new Promise((resolve, reject)=>{request(encodedPath, (error, response, body)=>{
      var rawBody = JSON.parse(body);
      movies.latest = rawBody.results
      console.log('latest', movies.latest.length)
      resolve(movies);
      })
    })
  }).then((movies)=>{
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

router.get('/results/:query', function(req, res, next) {
  console.log('GET results query')
  var encodedQuery = encodeURIComponent(req.params.query); 
  var encodedPath = `https://api.themoviedb.org/3/search/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&query=${encodedQuery}&page=1`
  request(encodedPath, (error, response, body)=>{
    var rawBody =JSON.parse(body);
    console.log('request to tmdb', rawBody.total_results)
    List.results = rawBody.results;
    res.render('results', {
      searchTerm: req.params.query,
      searchList: rawBody.results,
      savedList: List.retrieveSavedMovies(),
    })
  })
});

router.post('/add/:id', (req, res, next)=>{
  console.log('POST add', req.params.id)
  List.addMovieById(req.params.id);
  console.log('movie List', List.retrieveSavedMovies());
  res.render('yourList', {
    savedList: List.retrieveSavedMovies(),
  })
})

router.delete('/delete/:id', (req, res, next)=>{
  console.log('DELETE movie', req.params.id)
  List.removeMovieById(req.params.id)
  res.render('yourList', {
    savedList: List.retrieveSavedMovies(),
  })
})



module.exports = router;
