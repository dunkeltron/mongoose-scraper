var db = require("../models");

module.exports = function (app,axios,cheerio) {
    app.get("/", function (req, res) {        
        res.render("index",{});
    });
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.reddit.com/").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
      
          // Now, we grab every h2 within an article tag, and do the following:
          $(".SQnoC3ObvgnGjWt90zD9Z").each(function(i, element) {
            // Save an empty result object
            var result = {};
      
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .children("h2")
              .text();
            result.link = $(this)
              .attr("href");
              console.log(result);
      
            // Create a new Article using the `result` object built from scraping
            // db.Post.create(result)
            //   .then(function(dbPost) {
            //     // View the added result in the console
            //     console.log(dbPost);
            //   })
            //   .catch(function(err) {
            //     // If an error occurred, log it
            //     console.log(err);
            //   });
          });
      
          // Send a message to the client
          res.send("Scrape Complete");
        });
      });
}
