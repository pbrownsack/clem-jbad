const sql = require("../mysql");

const Customer = {};

Customer.findById = (id) => new Promise((resolve, reject) => {
    sql.query("SELECT * FROM customers WHERE id = ? LIMIT 1", [id], (err, results) => {
        if (err) return reject(err.code);
        resolve(results[0]);
    })
})

Customer.createNew = (fields) => new Promise((resolve, reject) => {
    sql.query("INSERT INTO customers (first_name, last_name, address, city, state, zip, date_added) VALUES (?, ?, ?, ?, ?, ?, curdate())", [
        fields.first_name,
        fields.last_name,
        fields.address || null,
        fields.city || null,
        fields.state || null,
        fields.zip || null
    ], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Customer.update = (fields) => new Promise((resolve, reject) => {
    const newFields = {...fields, id: undefined};

    sql.query("UPDATE customers SET ? WHERE id = ?", [newFields, fields.id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

Customer.remove = (id) => new Promise((resolve, reject) => {
    sql.query("DELETE FROM customers WHERE id = ?", [id], (err, result) => {
        if (err) return reject(err.code);
        resolve(result);
    })
})

module.exports = Customer;