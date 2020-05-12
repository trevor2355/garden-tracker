const { Pool } = require('pg');

console.log(process.env.HOST)
console.log(process.env.USERNAME)
console.log(process.env.DB)
console.log(process.env.PW)


const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DB,
  password: process.env.PW
})

module.exports = pool