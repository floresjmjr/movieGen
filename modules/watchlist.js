

module.exports = {

  savedMovies: [],

  findCategories: function(movies) {
    console.log('findCategories')
    this.savedGenres = [];
    this.savedMovies = movies;
    movies.forEach((movie)=>{
      movie.genre_ids.forEach((genre)=>{
        if(this.savedGenres.includes(genre)){
        } else {
          this.savedGenres.push(genre);
        }
      })
    })
    console.log('findCategories', this.savedGenres)
    this.obtainGenreObj();
    this.sortList()
  },

  obtainGenreObj: function() {
    this.savedGenres.forEach((id, idx)=>{
      this.allGenres.forEach((genreObj)=>{
        if (Number(id) === genreObj.id) {
          this.savedGenres[idx] = genreObj
        }
      })
    })
  },

  sortList: function() {
    this.savedGenres = this.savedGenres.sort((obj1, obj2)=>{
      if (obj1.name > obj2.name) {
        return 1
      } else if (obj1.name < obj2.name) {
        return -1
      } else {
        return 0;
      }
    })
  },

  filterMoviesBy: function(genre) {
    //returns the genreObj in arr format so that's why bracket notation and id property
    var id = this.removeAndReturnGenre(genre).id;
    console.log('filterMoviesBy', id);
    var filteredMovies = [];
    this.savedMovies.forEach((movie)=>{
      movie.genre_ids.forEach((genreId)=>{
        if (Number(genreId) === Number(id)) {
          filteredMovies.push(movie)
        }
      })
    })
    return filteredMovies;
  },

  removeAndReturnGenre: function(genreName) {
    genreName = decodeURIComponent(genreName);
    var genre;
    var index;
    this.savedGenres.forEach((genreObj, idx)=>{
      if (genreName === genreObj.name) {
        genre = genreObj;
        index = idx;
      }
    })
    this.savedGenres.splice(index, 1);
    this.savedGenres.push({name: 'All'})
    return genre;
  },

  
  allGenres: [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
  ]


}


