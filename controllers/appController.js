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
    axios.get("http://www.ign.com/articles").then(response => {
      var $ = cheerio.load(response.data);

      $(".listElmnt").each(function (i, element) {
        var result = {};

        result.title = $(this)
          .find(".listElmnt-blogItem")
          .children("a")
          .text();
        result.summary = $(this)
          .find(".listElmnt-blogItem")
          .children("p")
          .text();
        result.link = $(this)
          .find(".listElmnt-blogItem")
          .children("a")
          .attr("href");

        console.log(result);

        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.log(err));
      });

      res.redirect("/articles");
    });
  });

  app.get("/articles", (req, res) => {
    db.Article.find({})
      .then(function (dbArticle) {
        var hbsObject = {
          articles: dbArticle
        }
        console.log(hbsObject);
        res.render("articles", hbsObject)
      })
      .catch(err => res.json(err));
  });

  app.get("/savedArticles", (req, res) => {
    db.Article.find({ saved: true })
      .then(function (dbArticle) {
        var hbsObject = {
          articles: dbArticle
        }
        console.log(hbsObject);
        res.render("savedArticles", hbsObject)
      })
      .catch(err => res.json(err));
  });

  app.get("/savedArticles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(dbArticle => res.render(dbArticle))
      .catch(err => res.json(err));
  });


  // app.get("/savedArticles", (req, res) => {
  //   db.SavedArticle.find({})
  //   .populate("article")
  //   .populate("note")
  //   .then(dbSavedArticle => res.render(dbSavedArticle))
  //   .catch(err => res.json(err));
  // });

  app.post("/articles/:id", function (req, res) {
    db.Article.create(req.body)
      .then(dbArticle => db.Article.findOneAndUpdate({
        _id: req.params.id
      },
        {
          $set: {
            saved: true
          }
        }))
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  // Route for saving/updating an Article's associated Note
  app.post("/savedArticles/:id", function (req, res) {
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


