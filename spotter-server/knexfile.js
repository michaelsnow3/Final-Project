require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host     : process.env.HEROKU_DB_HOST,
      user     : process.env.HEROKU_DB_USER,
      password : process.env.HEROKU_DB_PASS,
      database : process.env.HEROKU_DB_NAME,
      port     : process.env.HEROKU_DB_PORT
    },
    ssl        : true,
    migrations: {
      directory: './db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};
