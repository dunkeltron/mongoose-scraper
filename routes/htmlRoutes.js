var db = require("../models");

module.exports = function (app,axios,cheerio) {
    app.get("/", function (req, res) {        
        res.render("index",{});
    });
    //default front page of reddit scrape
    //Look into expanding to allow for scraping of any reddit page  via req.params
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.reddit.com/").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
      
          // Now, we grab every h2 within an article tag, and do the following:
          $("._1poyrkZ7g36PawDueRza-J").each(function(i, element) {
            // Save an empty result object
            var result = {};
            var topBarInfo = $(this).children(".s1ssr92a-0")
                                    .children(".cZPZhMe-UCZ8htPodMyJ5")
                                    .children("._3AStxql1mQsrZuUIFP9xSg");
            var titlePlusHref = $(this).children("._3wiKjmhpIpoTE2r5KCm2o6").children(".y8HYJ-y_lTUHkQIc1mdCq").children("a");
            // Add the text and href of every link, and save them as properties of the result object
             result.title = titlePlusHref
               .children("h2")
               .text();
             result.link = titlePlusHref
               .attr("href");
            

            result.subreddit = topBarInfo.children(".bsfRLa").attr("href");

            result.postAge = topBarInfo.children("._3jOxDPIQ0KaOWpzvSQo-1s").text();
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
            if(result.title =='' || result.link == undefined || result.subreddit == undefined || result.postAge ==''){

            }
            else{
                console.log(result);
            }
            
          });
      
          // Send a message to the client
          res.send("Scrape Complete");
        });
      });
}
/*
//subreddit and post age
//_1poyrkZ7g36PawDueRza-J whole post div
//  s1ssr92a-0 hKePuf top bar post
//      .children("cZPZhMe-UCZ8htPodMyJ5")  container div of subreddit location
//      .children("_3AStxql1mQsrZuUIFP9xSg") div of subreddit info
//          .children("s1i3ufq7-0 bsfRLa").text()   subredditlocation
//          .children("_3jOxDPIQ0KaOWpzvSQo-1s").text() post age

//
//title and href
.SQnoC3ObvgnGjWt90zD9Z title div
.attr("href"); link
.children("h2").text(); title
*/