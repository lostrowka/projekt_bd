module.exports = function(app, pgClient){

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
};
