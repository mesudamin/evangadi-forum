const mysql2 = require('mysql2');
require('dotenv').config();

const db = mysql2.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    connectionLimit: process.env.connectionLimit
});



db.execute("SELECT 'test'", (err, res) => {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log(res);
    }
}
);