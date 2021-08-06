const sql = require("../mysql");

const Project = {};

Project.createNew = (fields) => new Promise((resolve, reject) => {
    sql.query("INSERT INTO projects (name, customer_id, description, date_started, date_finished, price_per_ft, final_footage VALUES (?, ?, ?, curdate(), ?, ?, ?)", [
        fields.name,
        fields.customer_id,
        fields.description,
        null,
        fields.price_per_ft,
        null
    ], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Project.getAll = (dateStart, dateFinish) => new Promise((resolve, reject) => {
    if (dateStart === undefined && dateFinish === undefined) {
        sql.query("SELECT * FROM projects", (err, results) => {
            if (err) return reject(err.code);
            resolve(results);
        })
    } else {
        if (dateStart !== undefined && dateFinish === undefined) {
            const sqlStart = new Date(dateStart);

            sql.query("SELECT * FROM projects WHERE date_started >= ?", [sqlStart], (err, results) => {
                if (err) return reject(err.code);
                resolve(results);
            })
        } else {
            const sqlStart = new Date(dateStart);
            const sqlEnd = new Date(dateFinish);

            sql.query("SELECT * FROM projects WHERE date_started >= ? AND date_finished <= ? AND date_finished IS NOT NULL", [sqlStart, sqlEnd], (err, results) => {
                if (err) return reject(err.code);
                resolve(results);
            })
        }
    }
})

Project.findById = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM projects WHERE id = ? LIMIT 1", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0]);
    })
})

Project.findByCustomerId = (customerId) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM projects WHERE customer_id = ?", [customerId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Project.getTotalHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours WHERE project_id = ? AND time_out IS NOT NULL", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0].total_hours || 0);
    })
})

Project.getHoursByUser = (id, userId) => new Promise((resolve, reject) => {
    sql.query("SELECT SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours WHERE project_id = ? AND user_id = ? AND time_out IS NOT NULL", [id, userId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0].total_hours || 0);
    })
})

Project.getDistHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT hours.user_id, users.first_name, users.last_name, SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours JOIN users ON hours.user_id = users.id WHERE project_id = ? AND hours.time_out IS NOT NULL GROUP BY hours.user_id, user.first_name, user.last_name", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Project.getAllHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT hours.user_id, users.first_name, users.last_name, TIMESTAMPDIFF(HOUR, time_in, time_out) AS row_hours FROM hours JOIN users ON hours.user_id = users.id WHERE project_id = ? AND hours.time_out IS NOT NULL", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Project.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM projects WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

module.exports = Project;