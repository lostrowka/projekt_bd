const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;
const pgClient = new pg.Client({
    database: 'library',
    host: '192.168.0.34',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
});

console.clear();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(['', '/'], (req, res) => {
    res.redirect("/index.html")
});

app.get(['/getAllBooks'], (req, res) => {
    pgClient.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.get(['/edit'], (req, res) => {
    res.sendFile(__dirname + "/frontend" + "/forms/edit_book.html")
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + "/frontend" + req.path);
});

app.listen(port, () => {
    let connectionString = "postgres://postgres:postgres@192.168.0.34:5432/library";
    pgClient.connect(err => {
        if (err) {
            console.error('Failed on connect to database', err.stack)
        } else {
            console.log('Postgres client connected to database')
        }
    });
    pgClient.query("SELECT * FROM users;", (err, res) => {
        if (err) throw err;
        console.log(res.rows);
    });
    console.log(`Listening on port ${port}`);
});
