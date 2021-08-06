const sql = require("../mysql");
const bcrypt = require("bcrypt");

const User = {};

User.getAll = () => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM users", (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

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

User.createNew = (fields) => new Promise(async (resolve, reject) => {
    const password = await User.generateHash(fields.password);

    // TODO: Add body parameter error-checking in case of front-end screwup

    const newUser = {
        username: fields.username,
        hash: password,
        first_name: fields.first_name,
        last_name: fields.last_name,
        admin: 0,
        hourly_pay: fields.hourly_pay || null,
        hire_date: fields.hire_date || null
    }

    sql.query("SELECT id FROM users WHERE username = ?", [fields.username], (err, results) => {
        if (err) return reject(err.code);
        if (results.length > 0) return reject("User already exists!");

        sql.query("INSERT INTO users SET ?", newUser, (err2, result) => {
            if (err2) return reject(err2.code);
            resolve(result);
        })
    })
})

User.changePassword = (id, newPassword) => new Promise(async (resolve, reject) => {
    const hash = await User.generateHash(newPassword);

    sql.query("SELECT id FROM users WHERE id = ?", [id], (err, results) => {
        if (err) return reject(err.code);

        if (results.length > 0) {
            sql.query("UPDATE users SET hash = ? WHERE id = ?", [hash, id], (err2, result) => {
                if (err2) return reject(err2.code);
                resolve(result);
            })
        } else {
            return reject("Could not find user!");
        }
    })
})

User.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

User.update = (fields) => new Promise((resolve, reject) => {
    const newFields = {...fields, id: undefined, username: undefined, hash: undefined};

    // TODO: Add existing user check *not important as of now*

    sql.query("UPDATE users SET ? WHERE id = ?", [newFields, fields.id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

User.generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

User.verifyPassword = async (hash, password) => {
    return await bcrypt.compare(password, hash);
}

module.exports = User;