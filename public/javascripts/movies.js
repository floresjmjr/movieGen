$(function() {

  const FrontPage = {

    movies: {},
    position: {'latest': {'start': 0, 'end': 4}, 'topRated': {'start': 0, 'end': 4}, 'trending': {'start': 0, 'end': 4}},

    //Heroku
    rootUrl: 'https://movie-recommendation-gen.herokuapp.com',

    //Localhost
    // rootUrl: 'http://localhost:3000',

    displayAllLists: function() {
      console.log('displayAllLists')
      var movieLists = ['topRated', 'latest', 'trending']
      movieLists.forEach((movieList)=>{
        this.displayList(movieList)
      })
    },
    displayList: function(movieList) {
      console.log('displayList');
      var tempFunc = Handlebars.compile($('#mListing').html());
      var preview = this.movies[movieList].slice(this.position[movieList].start, this.position[movieList].end)
      $(`#${movieList}`).fadeOut(()=>{
        $(`#${movieList}`).html(tempFunc({movies: preview})).fadeIn();
        this.formatDates(movieList)
      })
    },

    formatDates: function(movieList) {
      console.log('formatDates', movieList);
      $(`#${movieList} .date`).each((idx, el)=>{
        $(el).text(`(${$(el).text().substring(0,4)})`)        
      })
    },

    nextSlide: function() {
      console.log('nextSlide');
      $(`i[class='fas fa-chevron-right fa-3x'`).on('click', (e)=>{        
        var movieList = $(e.target.previousElementSibling).attr('id');
        console.log('name', movieList);
        if(this.position[movieList].end === 40) {          
        } else {
          this.position[movieList].start +=4
          this.position[movieList].end +=4
          this.displayList(movieList)
        }
      })
    },

    previousSlide: function() {
      console.log('previousSlide');
      $(`i[class='fas fa-chevron-left fa-3x'`).on('click', (e)=>{
        var movieList = $(e.target.nextElementSibling).attr('id');
        console.log('name', movieList);
        if(this.position[movieList].start === 0) {
        } else {          
          this.position[movieList].start -=4
          this.position[movieList].end -=4
          this.displayList(movieList)
        }
      })
    },

    frontPageMovies: function() {
      const request = new XMLHttpRequest();
      var url = this.rootUrl + '/movies';
      request.open('GET', url)
      request.responseType = 'json';
      request.send();
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          this.movies = request.response 
          console.log('clientside', this.movies)
          this.displayAllLists();
          this.nextSlide();
          this.previousSlide();
        } else {
          console.log(request.statusText)
        } 
      })
    },
  }  

  const ResultsPage = {
  
    loadResultsPage: function() {
      this.addMovie()
      this.deleteMovie()
    },

    addMovie: function() {
      console.log('addItem')
      $('main').on('click', 'button.addMovie', (e)=>{
        var id = $(e.target).attr('value');
        console.log('addMovie inside', id);
        this.addMovieToList(id);
      })
    },
  
    addMovieToList: function(id) {
      console.log('addMovieTolist')
      const request = new XMLHttpRequest();
      var url = FrontPage.rootUrl + `search/${id}`
      request.open('POST', url)
      request.send()
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          $('#yourList').html(request.response);
        }
      })
    },

    deleteMovie: function() {
      console.log('deleteMovie')
      $('main').on('click', 'button.deleteMovie', (e)=>{
        var id = $(e.target).attr('value');
        console.log('deleteMovie inside', id);
        this.deleteMovieFromList(id);
      })
    },

    deleteMovieFromList: function(id) {
      console.log('deleteMovieFromList', id)
      const request = new XMLHttpRequest();
      var url = FrontPage.rootUrl + `search/${id}`
      request.open('DELETE', url)
      request.send()
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          $('#yourList').html(request.response);
        }
      })
    },

  }


  if($('#front').length) {
    console.log('front context')
    FrontPage.frontPageMovies()
  }
  if($('#results').length) {
    console.log('results page')
    ResultsPage.loadResultsPage()
  }
})