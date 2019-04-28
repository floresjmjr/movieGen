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

}