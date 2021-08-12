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

Hours.getUserTotal = (userId) => new Promise((resolve, reject) => {
    sql.query("SELECT SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours WHERE user_id = ? AND time_out IS NOT NULL", [userId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0] || {});
    })
})

Hours.getByProject = (projectId) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM hours WHERE project_id = ?", [projectId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Hours.getWithinDate = (startDate, endDate, userId) => new Promise((resolve, reject) => {
    if (userId === undefined) {
        sql.query("SELECT * FROM hours WHERE time_in BETWEEN ? AND ?", [startDate, endDate], (err, results) => {
            if (err) return reject(err.code);
            resolve(results || []);
        })
    } else {
        sql.query("SELECT * FROM hours WHERE time_in BETWEEN ? AND ? AND user_id = ?", [startDate, endDate, userId], (err, results) => {
            if (err) return reject(err.code);
            resolve(results || []);
        })
    }
})

Hours.getAfterDate = (startDate, userId) => new Promise((resolve, reject) => {
    if (userId === undefined) {
        sql.query("SELECT * FROM hours WHERE time_in >= ?", [startDate], (err, results) => {
            if (err) return reject(err.code);
            resolve(results || []);
        })
    } else {
        sql.query("SELECT * FROM hours WHERE time_in >= ? AND user_id = ?", [startDate, userId], (err, results) => {
            if (err) return reject(err.code);
            resolve(results || []);
        })
    }
})

Hours.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM hours WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Hours.adjust = (fields) => new Promise((resolve, reject) => {
    if (fields.time_in && !fields.time_out) {
        sql.query("UPDATE hours SET time_in = ? WHERE id = ?", [fields.time_in, fields.id], (err, result) => {
            if (err) return reject(err.code);
            resolve(result);
        })
    } else if (fields.time_out && !fields.time_in) {
        sql.query("UPDATE hours SET time_out = ? WHERE id = ?", [fields.time_out, fields.id], (err, result) => {
            if (err) return reject(err.code);
            resolve(result);
        })
    } else {
        sql.query("UPDATE hours SET time_in = ?, time_out = ? WHERE id = ?", [fields.time_in, fields.time_out, fields.id], (err, result) => {
            if (err) return reject(err.code);
            resolve(result);
        })
    }
})

module.exports = Hours;