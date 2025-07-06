import 'dotenv/config'

export default {
  "development": {
    "username": "postgres",
    "password": "11092019",
    "database": "creche",
    "DB_PORT":5432,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
"production": {
  "username": 'neondb_owner',
 "password": 'npg_0uSbKJICNY5x',
   "database": "neondb?sslmode=require&channel_binding=require",
    "host": "ep-gentle-morning-a9gwktny-pooler.gwc.azure.neon.tech",
    "dialect": "postgres"
  }
}


/*import 'dotenv/config';
export default {
  /development: {
    username: 'neondb_owner',
    password: 'your_password',
    database: 'db_site_de_cours',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'neondb_owner',
    password: 'test_pass',
    database: 'db_site_de_cours',
    host: '127.0.0.1',
    dialect: 'postgres',
  },/
  main: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true } },
  },
}; */
