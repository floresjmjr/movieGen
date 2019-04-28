const GenFunc = require('./_community')

module.exports = {

  getMovieLists: function() {
    var categoryList = [
      { name: 'latest', url: 'https://api.themoviedb.org/3/trending/movie/week?api_key=372fa67260808fa002d6f3471d8dc7b3' },
      { name: 'topRated', url: 'https://api.themoviedb.org/3/discover/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=2019-04-06&vote_count.gte=500'}, 
      { name: 'latest', url: 'https://api.themoviedb.org/3/discover/movie?api_key=372fa67260808fa002d6f3471d8dc7b3&language=en&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=7'}
    ]
    var promises = [];
    categoryList.forEach((catObj)=>{
        promises.push(GenFunc.tmdbRequest(catObj.url))
    })
    return Promise.all(promises)
  }

}