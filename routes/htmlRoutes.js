//var db = require("../models");

module.exports = function (app, axios, cheerio) {
    app.get("/", function (req, res) {
        var handlebarsObject= req.data;
        res.render("index", handlebarsObject);
    })

}
