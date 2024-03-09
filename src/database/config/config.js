const { createPool } = require('mysql2/promise');
require('dotenv').config();

const options = {
  host: process.env.HOSTNAME,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

// dbConfig.js

const pool = createPool({
  host: process.env.HOSTNAME,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB_NAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  connectionLimit: 5,
});

module.exports = {
  pool,
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
