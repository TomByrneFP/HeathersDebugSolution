const { Pool } = require("pg")
require("dotenv").config()
//Connect to the Database

const db = new Pool({
    connectionString: process.env.DB_URL
})

module.exports = db

