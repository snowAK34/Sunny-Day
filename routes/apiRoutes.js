var express = require("express");
let db = require("../models");

var router = express.Router();

var ProductController = require("../controllers/productController");
var SeedController = require("../controllers/seedController")
var validateProduct = require("../middlewares/validateProduct");

router.get("/api", (req, res) => {
  res.send("Welcome to the api")
})
router.post("/api/products", ProductController.addProduct);
router.get("/api/products", ProductController.getAllProduct);
router.get("/api/products/:productId", ProductController.getSingleProduct);
router.get("api/products/search", ProductController.searchProduct);
router.patch("/api/products/:productId", ProductController.update);
router.delete("/api/products/:productId", ProductController.delete);


router.post("/api/seeds", SeedController.addSeed);
router.get("/api/seeds", SeedController.getAllSeed);
router.get("/api/seeds/:seedId", SeedController.getSingleSeed);
router.get("api/seeds/search", SeedController.searchSeed);
router.patch("/api/seeds/:seedId", SeedController.update);
router.delete("/api/seeds/:seedId", SeedController.delete);




module.exports = router;
