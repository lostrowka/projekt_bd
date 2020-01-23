const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;
const pgClient = new pg.Client({
    database: 'DB_PROJ_MIELIMONKA_OSTROWKA',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
});


app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

process.env.TZ = 'Europe/Warsaw';

require('./routes/authors')(app, pgClient);
require('./routes/books')(app, pgClient);
require('./routes/categories')(app, pgClient);
require('./routes/rentals')(app, pgClient);
require('./routes/users')(app, pgClient);

console.clear();

app.get(['', '/'], (req, res) => {
    res.redirect("/index.html")
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
    pgClient.query('SET datestyle TO dmy', (error, results) => {
        if (error) {
            console.log(error);
        }
    });
    console.log(`Listening on port ${port}`);
});
