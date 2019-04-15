var express = require("express");
let db = require("../models");

var router = express.Router();

var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController")
var validateProduct = require("../middlewares/validateProduct");

router.get("/api", (req, res) => {
  res.send("Welcome to the api")
})


// router.post('/addone', function (req, res) {
//   db.zombiesTable.create({
//     zombieName : req.body.zombieName
//   }).then(function () {
//       res.redirect("/");
      
//   });
// });

router.get("/testProd", function (req, res) {
  console.log(ProductController.addProduct);
});

// router.post("/api/products", ProductController.addProduct);

// router.get("/api/products", ProductController.getAllProduct);
// router.get("/api/products/:productId", ProductController.getSingleProduct);
// router.get("api/products/search", ProductController.searchProduct, function(req, res) {
//   console.log("RESPONSE from search route", req.body)
//     let product = req.body;
//   }).then( function() {
//     res.redirect("/home", product);
//   });
// router.patch("/api/products/:productId", ProductController.update);
// router.delete("/api/products/:productId", ProductController.delete);


// router.post("/api/seeds", SeedController.addSeed);
// router.get("/api/seeds", SeedController.getAllSeed);
// router.get("/api/seeds/:seedId", SeedController.getSingleSeed);
// router.get("api/seeds/search", SeedController.searchSeed);
// router.patch("/api/seeds/:seedId", SeedController.update);
// router.delete("/api/seeds/:seedId", SeedController.delete);




module.exports = router;
