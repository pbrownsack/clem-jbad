const sql = require("../mysql");

const Hours = {};

Hours.createNew = (fields) => new Promise((resolve, reject) => {
    sql.query("INSERT INTO hours (project_id, user_id, time_in, time_out, description) VALUES (?, ?, ?, ?, ?)", [
        fields.project_id || null,
        fields.user_id,
        fields.time_in,
        fields.time_out || null,
        fields.description || null
    ], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

// TODO: Add more hourly time operations

Hours.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM hours WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Hours.adjust = (id, fields) => new Promise((resolve, reject) => {
    if (!fields.time_in || !fields.time_out) return reject("Incorrect POST fields!");

    sql.query("UPDATE hours SET time_in = ?, time_out = ? WHERE id = ?", [fields.time_in, fields.time_out, id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

module.exports = Hours;