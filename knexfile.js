// Update with your config settings.

module.exports = {

  development: {
      client: 'postgresql',
      connection: {
          host : 'ec2-54-228-255-234.eu-west-1.compute.amazonaws.com',
          database: 'd7j3lqpj2hvog3',
          user:     'pwwjuznkufmdsh',
          password: '429a451b1bb8565346d128ae37effb4f8c72a8c177344f3d3141fd3ea25dbd79',
          port: '5432',
          ssl: true
      },
      pool: {
          min: 2,
          max: 10
      },
      migrations: {
          tableName: 'knex_migrations'
      }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
