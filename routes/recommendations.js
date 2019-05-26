//Router
const express = require('express')
const router = express.Router()

//Modules
const Recommend = require('../modules/recommendations')

//Get request for recommendations based on saved list
router.get('/recommendations/:id', (req, res, next)=>{
  console.log('GET request generate', req.params.id)
  Recommend.getRecommendations(req.params.id) 
  .then((recommendations)=>{
    Recommend.list = Recommend.mergeRecommendations(recommendations); 
    res.render('recommendations', {
      list: Recommend.list,
    })
  })
})


module.exports = router