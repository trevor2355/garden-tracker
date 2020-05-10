const { Pool } = require('pg');

console.log('USER: ', process.env.USERNAME)
console.log('DB: ', process.env.DB)
console.log('HOST: ', process.env.HOST)

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DB,
})

module.exports = pool