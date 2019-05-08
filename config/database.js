const Sequelize = require('sequelize');

// Option 1 (localhost)
module.exports = new Sequelize("movie_collection", null, null, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
})




// Option 2 (Heroku)
// module.exports = new Sequelize(process.env.DATABASE_URL, {
  
//   define: {
//     timestamps: false,
//   },

// });


