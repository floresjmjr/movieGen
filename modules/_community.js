const request = require('request')

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
    return process.env.TMDB_API_KEY;
  },

  omdbApiKey: function() {
    return process.env.OMDB_API_KEY;
  },

}