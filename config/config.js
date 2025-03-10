module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'sip_development_back',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'sip_test_back',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    operatorsAliases: '0',
  },
  
  DEV_SECRET: 'secret-key',
  BCRYPT_ROUNDS: 10,
  ADMIN_ROLE: 1,
  MEDIC_ROLE: 2,
  PATIENT_ROLE: 3
};