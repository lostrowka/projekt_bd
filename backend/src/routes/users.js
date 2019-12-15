module.exports = function(app, pgClient){

    app.get(['/getAllUsers'], (req, res) => {
        pgClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });

    app.get(['/getUserById'], (req, res) => {
        let id = parseInt(req.param("id"));

        query = {
            text: 'SELECT * FROM users WHERE id = $1 ORDER BY id ASC',
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

    app.post(['/addUser'], (req, res) => {
        query = {
            text: 'INSERT INTO users (first_name, last_name, email) VALUES ($1, $2, $3)',
            values: [req.body["first_name"], req.body["last_name"], req.body["email"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.post(['/updateUser'], (req, res) => {
        query = {
            text: 'UPDATE users SET first_name=$2, last_name=$3, email=$4 WHERE id=$1',
            values: [parseInt(req.body["id"]), req.body["first_name"], req.body["last_name"], req.body["email"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.delete(['/deleteUser'], (req, res) => {
        query = {
            text: 'DELETE FROM users WHERE id=$1',
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
