const Sequelize = require('sequelize');


if (process.env.DB_URL) {
  module.exports = new Sequelize(process.env.DB_URL, {
    
    define: {
      timestamps: false,
    },

  });
} else {
  module.exports = new Sequelize("movie_collection", null, null, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  })
}


