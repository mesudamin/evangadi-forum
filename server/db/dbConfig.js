
const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const db = mysql2.createPool({
    host: process.env.host,
    port: Number(process.env.port || 16842),
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: Number(process.env.connectionLimit || 5),

    ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'ca.pem'), 'utf8'), rejectUnauthorized: true
    }
});

module.exports = db.promise();
