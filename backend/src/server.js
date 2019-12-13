const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;
const pgClient = new pg.Client({
    database: 'library',
    host: '192.168.244.128',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
});

require('./routes/authors')(app, pgClient);
require('./routes/categories')(app, pgClient);

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

app.get(['/getBookById'], (req, res) => {
    let id = parseInt(req.param("id"));

    query = {
        text: 'SELECT * FROM books WHERE id = $1 ORDER BY id ASC',
        values: [id]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
});

app.get(['/edit'], (req, res) => {
    res.sendFile(__dirname + "/frontend" + "/forms/edit_book.html")
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + "/frontend" + req.path);
});

app.listen(port, () => {
    pgClient.connect(err => {
        if (err) {
            console.error('Failed on connect to database', err.stack)
        } else {
            console.log('Postgres client connected to database')
        }
    });
    console.log(`Listening on port ${port}`);
});
