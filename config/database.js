const Sequelize = require('sequelize');


module.exports = new Sequelize(process.env.DATABASE_URL, {
  
  define: {
    timestamps: false,
  },

});



