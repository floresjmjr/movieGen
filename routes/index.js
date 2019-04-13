var express = require('express');
var router = express.Router();
var request = require('request')
var path = require('path');
var db = require('../config/database')
var Movie = require('../models/Movie')

var Search = require(path.resolve(path.dirname(__dirname), './modules/search.js'))

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
  Movie.findAll().then((savedMovies)=>{
    var renderObj = {};
    return new Promise((resolve, reject)=>{
      request(encodedPath, (error, response, body)=>{
        var rawBody =JSON.parse(body);
        console.log('request to tmdb', rawBody.total_results)
        //Added the search results locally
        Search.results = rawBody.results;
        console.log('search results', Search.results.length);
        renderObj.savedList = savedMovies
        renderObj.searchList = Search.results
        renderObj.searchTerm = req.params.query;
        resolve(renderObj)
      })
    }).then((renderObj)=>{
      console.log('savedMovies', renderObj.savedList.length);
      res.render('results', renderObj)
    }).catch((err) => console.log('whoops!', err));
  });
});

router.post('/add/:id', (req, res, next)=>{
  console.log('POST add', req.params.id)
  var savedMovie = Search.findMovieById(req.params.id);
  console.log('savedMovie add', savedMovie);
  Movie.create({
    movie_id: savedMovie.id,
    title: savedMovie.title,
    overview: savedMovie.overview,
    post_path: savedMovie.post_path,
    vote_average: savedMovie.vote_average,
    vote_count: savedMovie.vote_count,
    release_date: savedMovie.release_date,
    popularity: savedMovie.popularity,
    genre_ids: savedMovie.genre_ids,
  }).then((movie)=>{
    return Movie.findAll()
  }).then((savedMovies)=>{
    res.render('yourList', {
      savedList: savedMovies,
    })    
  }).catch((err)=>{ console.log(err)})
})

router.delete('/delete/:id', (req, res, next)=>{
  console.log('DELETE movie', req.params.id)
  var id = Number(req.params.id);
  Movie.destroy({
    where: {
      movie_id: id,
    }
  }).then(()=>{
    return Movie.findAll()    
  }).then((savedMovies)=>{
    res.render('yourList', {
      savedList: savedMovies,
    })
  })
})



module.exports = router;
