module.exports = function(app, pgClient) {

    app.get(['/getAllBooks'], (req, res) => {
        pgClient.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
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
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.get(['/getCatalogData'], (req, res) => {
        pgClient.query('SELECT B.id, B.title, CONCAT(A.first_name, \' \', A.last_name) AS author, C.name AS category, ' +
            'B.isbn FROM books B, authors A, categories C WHERE B.author_id=A.id AND B.category_id=C.id ' +
            'ORDER BY id ASC;', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });

    app.post(['/addBook'], (req, res) => {
        query = {
            text: 'INSERT INTO books (title, author_id, category_id, isbn) VALUES ($1, $2, $3, $4)',
            values: [req.body["title"], req.body["author_id"], req.body["category_id"], req.body["isbn"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.post(['/updateBook'], (req, res) => {
        query = {
            text: 'UPDATE books SET title=$2, author_id=$3, category_id=$4, isbn=$5 WHERE id=$1',
            values: [parseInt(req.body["id"]), req.body["title"], req.body["author_id"], req.body["category_id"], req.body["isbn"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.delete(['/deleteBook'], (req, res) => {
        query = {
            text: 'DELETE FROM books WHERE id=$1',
            values: [parseInt(req.query["id"])]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });
};
