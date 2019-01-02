var db = require("../models");

module.exports = function (app, axios, cheerio) {
    console.log("html loaded");
    var handlebarsObject= {};
    app.get("/",function (req,res){
        db.Post.find({})
            .then(function (data) {
                handlebarsObject = {
                    articles : data
                };
                res.render("index",handlebarsObject);
            });
    })
 
}
