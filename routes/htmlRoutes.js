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
      res.render("partials/products/products-add");
  });
// ===========================================================
  app.get("/update-product/:productId", ProductController.getSingleProduct);
//============================================================

// ===========================================================
  app.put("/update-product/:productId", ProductController.update);
//============================================================

  app.get("/add-seed", function(req, res) {
    res.render("partials/seeds/seeds-add");
  });

  // ===========================================================
  app.put("/update-seed/:seedId", SeedController.update);
//============================================================

  app.get("/update-seed/:seedId", SeedController.getSingleSeed);
  // , function(req, res) {
  //   res.render("partials/seeds/seeds-update");
  //   SeedController.getSingleSeed(req, res)
  // });

  app.get("/search-product", function(req, res) {
    res.render("partials/products/products-search");
  });

  app.get("/search-seed", function(req, res) {
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
