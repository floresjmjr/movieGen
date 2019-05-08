const request = require('request')
const Password = require('../passwords/api')

module.exports = {

  omdbRequest: function(url) {
    console.log('movieRequest')
    return new Promise((resolve, reject)=>{
      request(url, (error, response, body)=>{
        resolve(JSON.parse(body));
        reject(error);
      })
    })    
  },
  
  tmdbRequest: function(url) {
    console.log('movieRequest')
    return new Promise((resolve, reject)=>{
      request(url, (error, response, body)=>{
        resolve(JSON.parse(body).results);
        reject(error);
      })
    })    
  },

  tmdbApiKey: function() {
    return Password.tmdb;
  },

  omdbApiKey: function() {
    return Password.omdb;
  },

}