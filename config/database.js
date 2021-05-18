const Sequelize = require('sequelize');



const sequelize = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, 
  {
    host: process.env.RDS_HOSTNAME,
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    dialectOptions: {
      "ssl": {"require":true}
    },
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

sequelize.sync({force: true})

module.exports = sequelize 