


module.exports = {

  results: [],
  yourList: [],
  addMovieById: function(id) {
    console.log('addMovieById working');
    this.results.forEach((movieObj)=>{
      if (movieObj.id === Number(id)) {
        this.yourList.push(movieObj);
      }
    })
  },

  removeMovieById: function(id) {
    var index;
    console.log('removeMovieById')
    this.yourList.forEach((movieObj, idx)=>{
      if(movieObj.id === Number(id)) {
        index = idx;
      }
    })
    this.yourList.splice(index, 1);
  },

  retrieveSavedMovies: function() {
    console.log('retrieveSavedMovies')
    return this.yourList
  },

}