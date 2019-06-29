// Requiring all models
const db = require("../models");

// Scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Routes
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/scrape", (req, res) => {
    axios.get("http://www.echojs.com/").then(response => {
      var $ = cheerio.load(response.data);

      $("article h2").each(function (i, element) {
        var result = {};

        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        console.log(result);

        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.log(err));
      });

      res.send("Scrape Complete");
    });
  });

  app.get("/articles", (req, res) => {
    db.Article.find({})
      .then(dbArticle => res.render(dbArticle))
      .catch(err => res.json(err));
  });

  app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(dbArticle => res.render(dbArticle))
      .catch(err => res.json(err));
  });

  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
      .then(dbNote => db.Article.findOneAndUpdate({
        _id: req.params.id
      },
        {
          $set: {
            note: dbNote
          }
        }))
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));

  });
};


