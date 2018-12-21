var db = require("../models");

module.exports = function (app) {
    app.get("/posts",function(req,res){
        console.log("test");
    })
}