const express = require('express');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');



app.get('/', (req, res) => {
    const connection = mysql.createConnection(config);
    const sql = `INSERT INTO people(name) values ('Vitor')`;
    connection.query(sql);
    connection.query(`SELECT name FROM people`, (err, rows) => {
        connection.end();
        if (err) {
            console.log(err);
            res.send('Error');
        } else {
            res.json(rows);
        }
    });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));