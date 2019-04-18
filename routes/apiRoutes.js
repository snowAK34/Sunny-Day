var express = require("express");
var passport = require("passport");
var db = require("../models");
var router = express.Router();
var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController");
var validateProduct = require("../middlewares/validateProduct");
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.post("/", passport.authenticate("local"), function(req, res) {
  res.render("home");
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", isAuthenticated, function(req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
      console.log("WORKS");
      res.redirect("/");
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  console.log("LOGGING OUT");
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

router.get("/home", isAuthenticated, function(req, res) {
  res.render("home");
});

router.get("/api", isAuthenticated, (req, res) => {
  res.send("Welcome to the api");
});

router.post(
  "/api/products",
  isAuthenticated,
  validateProduct,
  ProductController.addProduct
);
router.get("/api/products", isAuthenticated, ProductController.getAllProduct);

router.get(
  "/api/products/:productId",
  isAuthenticated,
  ProductController.getSingleProduct
);
router.get(
  "api/products/search",
  isAuthenticated,
  ProductController.searchProduct
);
router.put(
  "/api/products/:productId",
  isAuthenticated,
  ProductController.update
);
router.delete(
  "/api/products/:productId",
  isAuthenticated,
  ProductController.delete
);

router.post("/api/seeds", isAuthenticated, SeedController.addSeed);
router.get("/api/seeds", isAuthenticated, SeedController.getAllSeed);
router.get("/api/seeds/:seedId", isAuthenticated, SeedController.getSingleSeed);
router.get("api/seeds/search", isAuthenticated, SeedController.searchSeed);
router.put("/api/seeds/:seedId", isAuthenticated, SeedController.update);
router.delete("/api/seeds/:seedId", isAuthenticated, SeedController.delete);

module.exports = router;
