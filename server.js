var app = require("./app");
var config = require("./config/config");

app.listen(config.env.port, () => {
    console.log("IT WORKS!");
})