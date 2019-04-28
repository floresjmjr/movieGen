//Router
var express = require('express');
var router = express.Router();

//Extras
var path = require('path');

//Modules
var DB = require('../modules/database');
var Search = require(path.resolve(path.dirname(__dirname), './modules/search.js'))


// GET request for search results based on search term(s)
router.get('/search', function(req, res, next) {
  console.log('GET results query', req.query.movieTitle)
  var renderObj = {};
  renderObj.searchTerm = req.query.movieTitle;
  DB.findSavedMovies()
  .then((savedMovies)=>{
    renderObj.savedList = savedMovies;
    return Search.byMovieName(req.query.movieTitle)
  })
  .then((movieList)=>{
    Search.results = movieList;
    renderObj.searchList = movieList
    res.render('results', renderObj)
  }).catch((err)=>{ console.log(err)})
})

// POST request when adding a movie to the database
router.post('/search/:id', (req, res, next)=>{
  console.log('POST add', req.params.id)
  DB.insertMovie(Search.movieById(req.params.id))
  .then((movie)=>{ 
    return DB.findSavedMovies()
  })
  .then((savedMovies)=>{
    console.log('savedMovies', savedMovies);
    res.render('yourList', {
      savedList: savedMovies,
    })    
  }).catch((err)=>{ console.log(err)})
})

// DELETE request when deleting a movie from the database
router.delete('/search/:id', (req, res, next)=>{
  console.log('DELETE movie', req.params.id)
  DB.removeMovieById(Number(req.params.id))
  .then(()=>{
    return DB.findSavedMovies()
  })
  .then((savedMovies)=>{
    res.render('yourList', {
      savedList: savedMovies,
    })
  }).catch((err)=>{ console.log(error)})
})



module.exports = router;