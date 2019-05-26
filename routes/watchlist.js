// Router
const express = require('express')
const router = express.Router()

// Modules
const DB = require('../modules/database.js')
const Search = require('../modules/search.js')
const Watchlist = require('../modules/watchlist')

// GET request, lists the saved movies
router.get('/watchlist/:genre', (req, res)=>{
  console.log('watchlist genre', req.params.genre);
  DB.findSavedMovies()
  .then((savedMovies)=>{
    Watchlist.findCategories(savedMovies);
    var movieList = [];
    if (req.params.genre === 'All') {
      movieList = savedMovies;
    } else {
      movieList = Watchlist.filterMoviesBy(req.params.genre);
    }
    console.log('GET watchlist');
    res.render('watchlist', {
      savedList: movieList,
      genres: Watchlist.savedGenres,
      topGenre: req.params.genre,
    })
  })
})

// POST request when adding a movie to the database
router.post('/watchlist/:id', (req, res)=>{
  console.log('POST add', req.params.id)
  DB.insertMovie(Search.movieById(req.params.id))
  .then((movie)=>{ 
    if(movie.title) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    } 
  })
  .catch((err)=>{ console.log(err)})
})

// DELETE request when deleting a movie from the database
router.delete('/watchlist/:id', (req, res)=>{
  console.log('DELETE movie', req.params.id)
  DB.removeMovieById(Number(req.params.id))
  .then((returnValue)=>{
    if(returnValue) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  })
  .catch((err)=>{ console.log(err)})
})

module.exports = router;