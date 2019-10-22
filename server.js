var app = require("./app");
var config = require("./config/config");

app.listen(process.env.PORT || config.env.port, () => {
    console.log("IT WORKS!");
})