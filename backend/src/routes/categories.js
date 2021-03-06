module.exports = function(app, pgClient){

    app.get(['/getAllCategories'], (req, res) => {
        pgClient.query('SELECT * FROM categories ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
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
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.delete(['/deleteCategory'], (req, res) => {
        query = {
            text: 'DELETE FROM categories WHERE id=$1',
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
