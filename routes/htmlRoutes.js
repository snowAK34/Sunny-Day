let db = require("../models");

var ProductController = require("../controllers/productController")

var SeedController = require("../controllers/seedController")

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
      res.render("home", {
        msg: "Welcome!",
      });
    });

  app.get("/add-product", function(req, res) {
      req.flash("info", "I got======= here")
      res.render("partials/products/products-add");
  });

  app.get("/update-product/:productId", function(req, res) {
    req.flash("info", "I gor======= here")
    res.render("partials/products/products-update");
    ProductController.getSingleProduct(req, res)
  });

  app.get("/add-seed", function(req, res) {
    req.flash("info", "I got======= here")
    res.render("partials/seeds/seeds-add");
  });

  app.get("/update-seed/:seedId", function(req, res) {
    req.flash("info", "I got======= here")
    res.render("partials/seeds/seeds-update");
    SeedController.getSingleSeed(req, res)
  });

  app.get("/search-product", function(req, res) {
    req.flash("info", "I got======= here")
    res.render("partials/products/products-search");
  });

  app.get("/search-seed", function(req, res) {
    req.flash("info", "I got======= here")
    res.render("partials/seeds/seeds-search");
  });

  app.get("/delete-seed/:seedId", function(req, res) {
    SeedController.delete(req, res)

  });

    app.get("/home", function(req, res) {
      res.render("home", {
        msg: "Welcome!",
      });
    });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
