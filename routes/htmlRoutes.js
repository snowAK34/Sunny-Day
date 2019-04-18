// Required dependencies and imports
var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController");
var express = require("express");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var router = express.Router();

// Root route is set to login.handlebars
router.get("/", function(req, res) {
  res.render("login");
});

// When authenticated, user is redirected to home.handlebars
router.post("/", passport.authenticate("local"), function(req, res) {
  res.redirect("/home");
});

// Requires user to be authenticated access
router.get("/signup", isAuthenticated, function(req, res) {
  res.render("signup");
});

// Requires user to be authenticated to access
router.get("/home", isAuthenticated, function(req, res) {
  res.render("home", {
    msg: "Welcome!"
  });
});

// All routes with isAuthenticated require user to be authenticated to hit the API or acess the page
router.get("/add-product", isAuthenticated, function(req, res) {
  res.render("partials/products/products-add");
});

// ===========================================================
router.get(
  "/update-product/:productId",
  isAuthenticated,
  ProductController.getSingleProduct
);
//============================================================

router.get("/add-seed", isAuthenticated, function(req, res) {
  res.render("partials/seeds/seeds-add");
});

router.get(
  "/update-seed/:seedId",
  isAuthenticated,
  SeedController.getSingleSeed
);

// ========================================================================
// ===========================================================

router.put("/update-product/:productId");
router.put("/update-seed/:seedId");

//==========================================================================
router.get("/search-product", isAuthenticated, function(req, res) {
  res.render("partials/products/products-search");
});

router.get("/search-seed", isAuthenticated, function(req, res) {
  res.render("partials/seeds/seeds-search");
});

router.get("/delete-seed/:seedId", isAuthenticated, function(req, res) {
  SeedController.delete(req, res);
});

router.get("/read", isAuthenticated, function(req, res) {
  res.render("read-content", { layout: "read-frame" });
});

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;
