const mysql = require('mysql');
const { dbConfig } = require('../config');

const db = mysql.createConnection(dbConfig);

const { promisify } = require('util');

db.connect((err) => {
    if (err) throw err;

    console.log("Database Connected");
});

db.query = promisify(db.query);

module.exports = db;
