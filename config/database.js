const Sequelize = require('sequelize');



const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, 
  {
    host: process.env.RDS_HOSTNAME,
    dialect: 'postgres',
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },

    define: {
      timestamps: false,
      tableName: 'movie',
    },  
  }
)


module.exports = sequelize 