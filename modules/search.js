
module.exports = {
  results: [],

  findMovieById: function(id) {
    console.log('addMovieById working');
    var savedMovie = {};
    this.results.forEach((movieObj)=>{
      if (movieObj.id === Number(id)) {
        savedMovie = movieObj;
      }
    })
    return savedMovie;
  },
}