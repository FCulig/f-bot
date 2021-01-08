const mysql = require('mysql');
const { database } = require('./../config.json');

const db = mysql.createConnection(database);

module.exports = { connect, executeQuery };

function connect() {
    db.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('Successfuly conntected to database.');
    });
}

function executeQuery(queryString, params, message) {
    return new Promise((resolve, reject) => {
        db.query(queryString, params, (e, r) => {
            if (e) {
                message.channel.send("Error while configuring permission! Contact support staff.");
                throw e;
            }
            resolve(r);
        });
    });
}

// Helpful threads
//https://github.com/mysqljs/mysql#escaping-query-values
//https://stackoverflow.com/questions/55429023/how-to-import-mysql-connection-in-another-file-in-nodejs
//https://stackoverflow.com/questions/23097689/export-var-to-routes-files-expressjs/23098092#23098092