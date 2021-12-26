const express = require('express');

const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'nodedb',
    password: 'nodedb',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
try {
    const sql = `INSERT INTO people(name) values ('Vitor')`;
    connection.query(sql);
    connection.end();
} catch(e) {
    console.error("errror", e.message)
}

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));