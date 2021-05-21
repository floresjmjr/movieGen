const request = require('request')

module.exports = {

  specialChars: [{'á':'a'}, {'é':'e'}, {'í':'i'}, {'ó':'o'}, {'ú':'u'}],

  omdbRequest: function(url) {
    console.log('movieRequest')
    return new Promise((resolve, reject)=>{
      request(url, (error, response, body)=>{
        console.log("omdbrequest", body)
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

  replaceSpecialChars: function(string) {
    return string.split('').map((char)=>{
      var char = char.toLowerCase()
      this.specialChars.forEach((sp)=>{
        if(sp[char]){	
          char = sp[char]
        }
      })
      return char
    }).join('')
  },

}