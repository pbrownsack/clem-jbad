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

Hours.findById = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM hours WHERE id = ? LIMIT 1", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0]);
    })
})

Hours.getAll = (userId) => new Promise((resolve, reject) => {
    if (userId === undefined) {
        sql.query("SELECT * FROM hours", (err, results) => {
            if (err) return reject(err.code);
            resolve(results);
        })
    } else {
        sql.query("SELECT * FROM hours WHERE user_id = ?", [userId], (err, results) => {
            if (err) return reject(err.code);
            resolve(results);
        })
    }
})

Hours.getByProject = (projectId) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM hours WHERE project_id = ?", [projectId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Hours.getWithinDate = (startDate, endDate, userId) => new Promise((resolve, reject) => {
    const sqlStart = new Date(startDate);
    const sqlEnd = new Date(endDate);

    if (userId === undefined) {
        sql.query("SELECT * FROM hours WHERE time_in BETWEEN ? AND ?", [sqlStart, sqlEnd], (err, results) => {
            if (err) return reject(err.code);
            resolve(results);
        })
    } else {
        sql.query("SELECT * FROM hours WHERE time_in BETWEEN ? AND ? AND user_id = ?", [sqlStart, sqlEnd, userId], (err, results) => {
            if (err) return reject(err.code);
            resolve(results);
        })
    }
})

Hours.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM hours WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Hours.adjust = (id, fields) => new Promise((resolve, reject) => {
    if (!fields.time_in || !fields.time_out) return reject("Incorrect body parameters!");

    sql.query("UPDATE hours SET time_in = ?, time_out = ? WHERE id = ?", [fields.time_in, fields.time_out, id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

module.exports = Hours;