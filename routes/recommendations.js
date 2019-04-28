//Router
const express = require('express')
const router = express.Router()

//Modules
const Recommend = require('../modules/recommendations')
const DB = require('../modules/database')

//Get request for recommendations based on saved list
router.get('/recommendations', (req, res, next)=>{
  console.log('GET request generate')
  DB.findSavedMovies()
  .then((movies)=>{
    return Recommend.getRecommendations(movies)
  })
  .then((recommendations)=>{
    res.render('recommendations', {
      list: Recommend.mergeRecommendations(recommendations),
    });
  })
})


module.exports = router