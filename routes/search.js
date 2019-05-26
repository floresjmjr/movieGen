//Router
var express = require('express');
var router = express.Router();

//Extras
var path = require('path');

//Modules
var Search = require(path.resolve(path.dirname(__dirname), './modules/search.js'))

// GET request for search results based on search term(s)
router.get('/search', function(req, res, next) {
  console.log('GET results query', req.query.movieTitle)
  Search.byMovieName(req.query.movieTitle)
  .then((movieList)=>{
    Search.results = movieList;
    res.render('results', {
      searchList: movieList,
      searchTerm: req.query.movieTitle,
    })
  }).catch((err)=>{ console.log(err)})
})


module.exports = router;