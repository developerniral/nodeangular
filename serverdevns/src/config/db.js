
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    
   // logging: false,
   // timezone: '+9',  // japan utc timezone
});

db.authenticate()
  .then(() => console.log('Database connected successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));


module.exports = db;
