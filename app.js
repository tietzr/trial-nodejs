var express = require("express");
var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

var authMiddleware = require("./middleware/authentication");
var errorMiddleware = require("./middleware/error");
app.use(authMiddleware);
app.use(errorMiddleware);

var AuthController = require("./routes/auth-router");
app.use("/auth", AuthController);

var TracksController = require("./routes/track-router");
app.use("/tracks", TracksController);

app.get("/", (req, res) => {
    res.status(200).send("IT WORKS!");
})

module.exports = app;