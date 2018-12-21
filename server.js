var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");



const app = express();

//set the port for the app to listen on
var PORT = process.env.PORT || 3000;

//set the URI for the mongo database to store our articles
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose with mongodb
//mongoose.connect(MONGODB_URI);

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//amke handlebars our templating engine
app.set("view engine", "handlebars");
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
