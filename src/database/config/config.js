const { createPool } = require('mysql2/promise');
require('dotenv').config();

const options = {
  host: process.env.HOSTNAME || 'kptransportes-backend.up.railway.app/',
  port: process.env.MYSQL_PORT || '11699',
  database: process.env.MYSQL_DB_NAME || 'railway',
  username: process.env.MYSQL_USER || 'mysql',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

// dbConfig.js

const pool = createPool({
  host: process.env.HOSTNAME || 'https://kptransportes-backend.up.railway.app/',
  port: process.env.MYSQL_PORT || '11699',
  database: process.env.MYSQL_DB_NAME || 'railway',
  user: process.env.MYSQL_USER || 'mysql',
  password: process.env.MYSQL_PASSWORD || 'password',
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
