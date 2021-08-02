const sql = require("../mysql");

const User = {};

User.findById = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0]);
    })
})

User.find = (username) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users WHERE username = ? LIMIT 1", [username], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0]);
    })
})

User.createNew = (fields) => new Promise((resolve, reject) => {

})

User.verifyPassword = (user, password) => {
    const { salt, hash } = user;
    
}

module.exports = User;