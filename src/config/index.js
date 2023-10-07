require("dotenv").config();

const config = {
    dev: process.env.NODE_ENV !== "production",
    port: process.env.PORT || 3000,
    host:process.env.DB_HOST,
    portDB:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    databaseUrl: process.env.DB_DATAB,
}

module.exports = config;