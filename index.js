var express = require("express");
var app = express();

const frases = [
    "y... habria que verlo",
    "depende",
    "y...",
    "todo es relativo...",
    "eso con hitler no pasaba"
];

app.get("/frase", (req, res, next) => {
    res.json(frases[Math.floor(Math.random() * frases.length)]);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});