const mysql = require("mysql");
const dbConfig = require("./config/mysql");

const conn = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database
});

conn.on("error", err => {
    console.log("[CLEM] Fatal MySQL error: " + err.code);
    throw err;
})

conn.connect(err => {
    if (err) throw err;
    console.log("[CLEM] Connected to MySQL successfully");
});

module.exports = conn;