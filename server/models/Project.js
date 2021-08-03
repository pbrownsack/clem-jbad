const sql = require("../mysql");

const Project = {};

Project.createNew = (fields) => new Promise((resolve, reject) => {

})

Project.findById = (id) => new Promise((resolve, reject) => {

})

Project.findByCustomerId = (customerId) => new Promise((resolve, reject) => {

})

Project.getTotalHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours WHERE project_id = ?", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0].total_hours || 0);
    })
})

Project.getHoursByUser = (id, userId) => new Promise((resolve, reject) => {
    sql.query("SELECT SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours WHERE project_id = ? AND user_id = ?", [id, userId], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0].total_hours || 0);
    })
})

Project.getDistHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT hours.user_id, users.first_name, users.last_name, SUM(TIMESTAMPDIFF(HOUR, time_in, time_out)) AS total_hours FROM hours JOIN users ON hours.user_id = users.id WHERE project_id = ? GROUP BY user_id, first_name, last_name", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Project.getAllHours = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT hours.user_id, users.first_name, users.last_name, TIMESTAMPDIFF(HOUR, time_in, time_out) AS row_hours FROM hours JOIN users ON hours.user_id = users.id WHERE project_id = ?", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results);
    })
})

Project.remove = (id) => new Promise((resolve, reject) => {

})

module.exports = Project;