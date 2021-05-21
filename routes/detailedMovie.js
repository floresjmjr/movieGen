//Router
const express = require('express')
const router = express.Router();

//Modules
const Details = require('../modules/detailedMovie');


router.get('/movie/:movieData', (req, res, next)=>{
  const movieData = req.params.movieData.split(' ').join('%20')
  console.log('GET request movie', movieData)
  Details.getMovieByTitle(movieData)
  .then((movie)=>{
    console.log('before render detailed', movie)
    res.render('detailedMovie', movie)
  })  
})




module.exports = router;