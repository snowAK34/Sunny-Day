let db = require("../models");
var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController");
var path = require("path");
var express = require("express");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("login");
});

router.post("/", passport.authenticate("local"), function (req, res) {
  res.redirect("/home");
});

router.get("/signup", isAuthenticated, function (req, res) {
  res.render("signup");
});

router.get("/", function (req, res) {
  res.render("login", {
    msg: "Welcome!"
  });
});

router.get("/home", isAuthenticated, function (req, res) {
  res.render("home", {
    msg: "Welcome!"
  });
});

router.get("/add-product", isAuthenticated, function (req, res) {
  res.render("partials/products/products-add");
});

router.get(
  "/update-product/:productId",
  isAuthenticated,
  ProductController.getSingleProduct
);

router.get("/add-seed", isAuthenticated, function (req, res) {
  res.render("partials/seeds/seeds-add");
});

router.get(
  "/update-seed/:seedId",
  isAuthenticated,
  SeedController.getSingleSeed
);

router.put("/update-product/:productId");
router.put("/update-seed/:seedId");

router.get("/search-product", isAuthenticated, function (req, res) {
  res.render("partials/products/products-search");
});

router.get("/search-seed", isAuthenticated, function (req, res) {
  res.render("partials/seeds/seeds-search");
});

router.get("/delete-seed/:seedId", isAuthenticated, function (req, res) {
  SeedController.delete(req, res);
});

router.get("/read", isAuthenticated, function (req, res) {
  res.render("read-content", { layout: "read-frame" });
});

// Render 404 page for any unmatched routes
router.get("*", function (req, res) {
  res.render("404");
});

module.exports = router;
