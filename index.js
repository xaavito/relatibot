var express = require("express");
var app = express();
//FILES
var path = require('path');
var fs = require('fs');

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var dir = path.join(__dirname, '');

const frases = [
    "y... habria que verlo",
    "depende",
    "y...",
    "todo es relativo...",
    "eso con hitler no pasaba"
];

app.get("/", (req, res, next) => {
    res.json(frases[Math.floor(Math.random() * frases.length)]);
});

app.get('/fofi', function (req, res) {
    var file = path.join(dir, "./images/1.jpg");
    if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.set('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Not found');
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});