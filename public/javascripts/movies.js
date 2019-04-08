$(function() {

  var App = {

    movies: {},
    latestStartEnd: [],

    displayLatest: function() {
      console.log('displayLatest');
      var tempFunc = Handlebars.compile($('#mListing').html());
      this.latestStartEnd = [0,4]
      var preview = this.movies.latest.slice(this.latestStartEnd[0], this.latestStartEnd[1])
      $('#latest').html(tempFunc({movies: preview}))
    },

    displayTrending: function() {
      console.log('displayTrending');
      var tempFunc = Handlebars.compile($('#mListing').html());
      this.trendingStartEnd = [0,4]
      var preview = this.movies.trending.slice(this.trendingStartEnd[0], this.trendingStartEnd[1])
      $('#trending').html(tempFunc({movies: preview}))
    },

    displayTopRated: function() {
      console.log('displayTopRated');
      var tempFunc = Handlebars.compile($('#mListing').html());
      this.topRatedStartEnd = [0,4]
      var preview = this.movies.topRated.slice(this.topRatedStartEnd[0], this.topRatedStartEnd[1])
      $('#topRated').html(tempFunc({movies: preview}))
    },

    retrieveMovies: function() {
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/movies')
      request.responseType = 'json';
      request.send();
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          this.movies = request.response 
          console.log('clientside', this.movies)
          this.displayLatest();
          this.displayTrending();
          this.displayTopRated();
        } else {
          console.log(request.statusText)
        } 
      })
    },
  }  

  App.retrieveMovies()

})