const sql = require("../mysql");
const bcrypt = require("bcrypt");

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

User.generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

User.verifyPassword = async (hash, password) => {
    return await bcrypt.compare(password, hash);
}

module.exports = User;