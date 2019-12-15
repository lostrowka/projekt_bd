module.exports = function(app, pgClient){

    app.get(['/getAllRentals'], (req, res) => {
        pgClient.query('SELECT * FROM rentals ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });

    app.get(['/getRentalById'], (req, res) => {
        let id = parseInt(req.param("id"));

        query = {
            text: 'SELECT * FROM rentals WHERE id = $1 ORDER BY id ASC',
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

    app.get(['/getAllRentalEntries'], (req, res) => {
        pgClient.query('SELECT R.id, B.title AS book_title, CONCAT(U.first_name, \' \', U.last_name) AS user_name, R.date_on, R.date_to FROM rentals R, books B, users U WHERE R.book_id = B.id AND R.user_id = U.id ORDER BY id ASC', (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows)
            }
        })
    });

    app.post(['/addRental'], (req, res) => {
        var d = new Date();
        var datestring = d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear();

        query = {
            text: 'INSERT INTO rentals (book_id, user_id, date_on, date_to) VALUES ($1, $2, $3, $4)',
            values: [req.body["book_id"], req.body["user_id"], datestring, req.body["date_to"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.post(['/updateRental'], (req, res) => {
        console.log(req.body["date_on"]);
        console.log(req.body["date_to"]);
        query = {
            text: 'UPDATE rentals SET book_id=$2, user_id=$3, date_on=$4, date_to=$5 WHERE id=$1',
            values: [parseInt(req.body["id"]), req.body["book_id"], req.body["user_id"], req.body["date_on"], req.body["date_to"]]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });

    app.delete(['/deleteRental'], (req, res) => {
        query = {
            text: 'DELETE FROM rentals WHERE id=$1',
            values: [parseInt(req.query["id"])]
        };

        pgClient.query(query, (error, results) => {
            if (error) {
                console.log(error)
                res.status(500).json(error.detail)
            } else {
                res.status(200).json(results.rows[0])
            }
        })
    });
};
