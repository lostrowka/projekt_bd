const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

console.clear();

app.use(bodyParser.json());

app.get(['', '/'], (req, res) => {
    res.redirect("/index.html")
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + "/frontend" + req.path);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
