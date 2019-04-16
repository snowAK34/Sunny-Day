let db = require("../models");
var path = require("path");
var express = require("express");
var passport = require("../config/passport");
var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
// module.exports = function(app) {

router.get("/", function(req, res) {
  res.render("login");
});

// router.get("/api/login", function(req, res) {
//   res.render("login");
// });

router.post("/", passport.authenticate("local"), function(req, res) {
  res.redirect("/home");
});

router.post("/api/signup", isAuthenticated, function(req, res) {
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //   if (err) throw err;
  // Store hash in your password DB.
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    console.log("complete");
  });
  res.redirect("/home");
});

router.get("/add-product", isAuthenticated, function(req, res) {
  req.flash("info", "I gor======= here");
  res.render("partials/products/products-add");
});

router.get("/update-product/:productId", isAuthenticated, function(req, res) {
  ProductController.getSingleProduct(req, res);
});

router.get("/add-seed", isAuthenticated, function(req, res) {
  req.flash("info", "I gor======= here");
  res.render("partials/seeds/seeds-add");
});

router.get("/update-seed/:seedId", isAuthenticated, function(req, res) {
  // req.flash("info", "I gor======= here")
  // res.render("partials/seeds/seeds-update");
  SeedController.getSingleSeed(req, res);
});

router.get("/search-product", isAuthenticated, function(req, res) {
  req.flash("info", "I gor======= here");
  res.render("partials/products/products-search");
});

router.get("/search-seed", isAuthenticated, function(req, res) {
  req.flash("info", "I gor======= here");
  res.render("partials/seeds/seeds-search");
});

router.get("/delete-seed/:seedId", isAuthenticated, function(req, res) {
  SeedController.delete(req, res);
});

router.get("/home", isAuthenticated, function(req, res) {
  res.render("home", {
    msg: "Welcome!"
  });
});

// Render 404 page for any unmatched routes
router.get("*", function(req, res) {
  res.render("404");
});
// };
module.exports = router;
