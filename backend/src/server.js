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

app.get(['/getAllAuthors'], (req, res) => {
    pgClient.query('SELECT * FROM authors ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.get(['/getAuthorById'], (req, res) => {
    let id = parseInt(req.param("id"));

    query = {
        text: 'SELECT * FROM authors WHERE id = $1 ORDER BY id ASC',
        values: [id]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
});

app.post(['/addAuthor'], (req, res) => {
    query = {
        text: 'INSERT INTO authors (first_name, last_name, origin) VALUES ($1, $2, $3)',
        values: [req.body["first_name"], req.body["last_name"], req.body["origin"]]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            res.status(503).text(error.detail)
        }
        res.status(200).json(results.rows[0])
    })
});

app.post(['/updateAuthor'], (req, res) => {
    query = {
        text: 'UPDATE authors SET first_name=$2, last_name=$3, origin=$4 WHERE id=$1',
        values: [parseInt(req.body["id"]), req.body["first_name"], req.body["last_name"], req.body["origin"]]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
});

app.get(['/getAllCategories'], (req, res) => {
    pgClient.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

app.get(['/getCategoryById'], (req, res) => {
    let id = parseInt(req.param("id"));

    query = {
        text: 'SELECT * FROM categories WHERE id = $1 ORDER BY id ASC',
        values: [id]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            res.status(500).json(error.detail)
        } else {
            res.status(200).json(results.rows[0])
        }
    })
});

app.post(['/addCategory'], (req, res) => {
    query = {
        text: 'INSERT INTO categories (name) VALUES ($1)',
        values: [req.body["name"]]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            res.status(503).json(error.detail)
        } else {
            res.status(200).json(results.rows[0])
        }
    })
});

app.post(['/updateCategory'], (req, res) => {
    query = {
        text: 'UPDATE categories SET name=$2 WHERE id=$1',
        values: [parseInt(req.body["id"]), req.body["name"]]
    };

    pgClient.query(query, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows[0])
    })
});

app.get(['/getCatalogData'], (req, res) => {
    pgClient.query('SELECT B.id, B.title, CONCAT(A.first_name, \' \', A.last_name) AS author, C.name AS category, ' +
                   'B.isbn FROM books B, authors A, categories C WHERE B.author=A.id AND B.category=C.id ' +
                   'ORDER BY id ASC;', (error, results) => {
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
    pgClient.connect(err => {
        if (err) {
            console.error('Failed on connect to database', err.stack)
        } else {
            console.log('Postgres client connected to database')
        }
    });
    console.log(`Listening on port ${port}`);
});
