//Router
var express = require('express');
var router = express.Router();

//Modules
const Homepage = require('../modules/homepage')


/* GET home page. */
router.get('/', function(req, res) {
  console.log('get / request')
  res.render('homepage', {
    title: 'movieGen',
  });
});

// GET request for movie data for homepage
router.get('/movies', (req, res)=>{
  console.log('get /movies request')
  var collection = {};
  Homepage.getTrendingList()
  .then((trending)=>{
    collection.trending = [];
    trending.forEach((arr)=>{
      collection.trending.push(...arr);
    })
    collection.trending.forEach((pair)=> {
      pair.link = pair.title.split(' ').join('%20')
    })
    return Homepage.getTopRatedList()
  })
  .then((topRated)=>{
    collection.topRated = [];
    topRated.forEach((arr)=>{
      collection.topRated.push(...arr);
    })
    collection.topRated.forEach((pair)=> {
      pair.link = pair.title.split(' ').join('%20')
    })
    return Homepage.getLatestList()
  })
  .then((latest)=>{
    collection.latest = [];
    latest.forEach((arr)=>{
      collection.latest.push(...arr);
    })
    collection.latest.forEach((pair)=> {
      pair.link = pair.title.split(' ').join('%20')
    })
    res.send(collection);
  });
})


module.exports = router;


