$(function() {

  const MovieGen = {

    movies: {},
    position: {'latest': {'start': 0, 'end': 4}, 'topRated': {'start': 0, 'end': 4}, 'trending': {'start': 0, 'end': 4}},

    rootUrl: function() {
      return window.location.href.split(window.location.pathname)[0]
    },

    loadPage: function() {
      this.addMovie()
      this.deleteMovie()
    },

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
      $(`i[class='fas fa-chevron-right fa-3x']`).on('click', (e)=>{        
        var movieList = $(e.target.parentElement.previousElementSibling).attr('id');
        console.log('name', movieList);
        $(e.target).closest('section').find('i').eq(0).show();
        this.position[movieList].start +=4
        this.position[movieList].end +=4
        var ulHeight = $(`#${movieList}`).css('height')
        console.log('ulHeight', ulHeight);
        $(`#${movieList}`).css('height', ulHeight)
        this.displayList(movieList)
        if(this.position[movieList].end === 40) {          
          $(e.target).hide()
        }
      })
    },

    previousSlide: function() {
      console.log('previousSlide');
      $(`i[class='fas fa-chevron-left fa-3x']`).on('click', (e)=>{
        var movieList = $(e.target.parentElement.nextElementSibling).attr('id');
        console.log('name', movieList);
        $(e.target).closest('section').find('i').eq(1).show();
        this.position[movieList].start -=4
        this.position[movieList].end -=4
        this.displayList(movieList)
        if(this.position[movieList].start === 0) {
          $(e.target).hide()
        }
      })
    },

    resizeWindow: function() {
      $(window).resize(()=>{
        console.log('resizeWindow');
        $('ul').each((idx, el)=>{
          $(el).css('height', '')
        })
      })
    },

    frontPageMovies: function() {
      const request = new XMLHttpRequest();
      var url = this.rootUrl() + '/movies';
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
          this.resizeWindow();
        } else {
          console.log(request.statusText)
        } 
      })
    },  

    addMovie: function() {
      console.log('addItem')
      $('main').on('click', 'button.addMovie', (e)=>{
        e.preventDefault();
        var id = $(e.target).attr('value');
        console.log('addMovie inside', id);
        this.addMovieToList(id);
      })
    },
  
    addMovieToList: function(id) {
      console.log('addMovieTolist')
      const request = new XMLHttpRequest();
      var url = this.rootUrl() + `/watchlist/${id}`
      request.open('POST', url)
      request.send()
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          alert('Your movie was added');
        } else {
          alert('The movie was NOT added');
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
      var url = this.rootUrl() + `/watchlist/${id}`
      request.open('DELETE', url)
      request.send()
      request.addEventListener('load', ()=>{
        if (request.status === 200) {
          $(`button[value=${id}]`).closest('li').remove();
        } else {
          alert('movie was NOT deleted')
        }
      })
    },

    selectGenre: function() {
      console.log('selectGenre')
      $('main').on('change', '#genreSelection', (e)=>{
        console.log($(e.target).val())
        var genre = encodeURIComponent($(e.target).val());
        window.location.href = this.rootUrl() + `/watchlist/${genre}`
        
      })
    },


  }

  if($('#front').length) {
    MovieGen.frontPageMovies()
  } else {
    MovieGen.loadPage();
    MovieGen.selectGenre();
  }

})