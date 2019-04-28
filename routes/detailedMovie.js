//Router
const express = require('express')
const router = express.Router();

//Modules
const Details = require('../modules/detailedMovie');


router.get('/movie/:movieData', (req, res, next)=>{
  console.log('GET request movie', req.params.movieData)
  Details.getMovieByTitle(req.params.movieData)
  .then((movie)=>{
    console.log('before render detailed', movie)
    res.render('detailedMovie', movie)
  })  
})




module.exports = router;