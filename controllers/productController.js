// module to implement crud for Product

var models = require("../models/index")
var Sequelize = require("sequelize")

var Op = Sequelize.Op;


class ProductController {


  static getAllProduct(req, res) {
    console.log("I got here")
    models.Product.findAll({
      attributes: [
        "id",
        "strain",
        "price",
        "packaging",
        "size",
        "quantity",
        "thc",
        "cbd",
        "type",
        "strain_type",
        "genetics",
        "flavor",
        "feelings",
        "alleviates",
        "comments"
      ]
    })
    .then( function(product){
      if(product){
        return res.status(200).json({
          "message": "all product has been fetched successfully",
          "data": product
        })
      }
    })
    .catch(function(err){
      return res.status(500).json({
        status: "FAILED",
        message: "Error processing request, please try again",
        Error: err.toString()
      })
  })
}

  static getSingleProduct(req, res) {
    var  productId  = req.params.productId
    models.Product.findOne({
      where: {
        "id": productId
      },

      attributes: [
        "id",
        "strain",
        "price",
        "packaging",
        "size",
        "quantity",
        "thc",
        "cbd",
        "type",
        "strain_type",
        "genetics",
        "flavor",
        "feelings",
        "alleviates",
        "comments"
        
      ]
    })
      .then(function (product) {
        if (product) {
          res.render("partials/products/products-update", { product: product, messages: req.flash("info", "product fetched successfully") });

          // return res.status(200).json({
          //   "message": "Single product fetched successfully",
          //   "data": product
          // })
        }
        else{
          req.flash("info", "The product id does not exist")
          res.redirect("/home")
        }
        // return res.status(400).json({
        //   "message": "Product Id does not exist",
        //   "status": "Failed"
        // })
      
      })
      .catch(function (err) {
        return res.status(500).json({
          status: "FAILED",
          message: "Error processing request, please try again",
          Error: err.toString()
        })
      })
  }

   /**
   * @static
   *  Method to add a new product
   * @param {*} request
   * @param {*} response
   * @memberof ProductCOntroller
   */

  static addProduct(req, res) {
    var {
      strain, price, size, quantity, type, cbd,
      packaging, thc, strain_type, 
      genetics, flavor, feelings, alleviates, comments
    } = req.body

    models.Product.findOrCreate({
      where: {
        strain: strain
      },
      defaults: {
        strain, price: parseFloat(price), flavor, size, quantity: parseInt(quantity),
        genetics, type, strain_type, cbd,
        packaging, thc, alleviates, comments, feelings
      }
    })
      .spread(function (product, created) {
        if (!created) {
          req.flash("info", "Product already exists")
          res.redirect("/home")
        } else {
          req.flash("info", "A new product has been added")
          res.redirect("/home")
        }
      }).catch(function (err) {
        return res.status(500).json({
          status: "FAILED",
          message: "Error processing request, please try again",
          Error: err.toString()
        })
      });
  }


  static searchProduct(req, res, cb) {
    var { strain } = req.query

    Model.findAll({
      attributes: ['id', 'strain', 'price', 'quantity', 'packaging', 'cbd', 'feelings', 'comments', 'alleviates']
    });
   
    ( function(product){
      if(product){
        return res.status(200).json({
          status: "SUCCESS",
          message: "Product Fetched Successfully",
          data: product
        })
      }
    })
    .catch(function(err){
      return res.status(500).json({
        status: "FAILED",
        message: "Error processing request, please try again",
        Error: err.toString()
      })
    })
  }

  //=====================================================
  //Update Product
  //=====================================================
  static update(req, res) {
    console.log(req.body)
    var { productId } = req.params
    var {price, quantity} = req.body
    console.log('productId', productId);
    console.log('price', price);
    console.log('quantity', quantity);
    models.Product.findOne({where :{ id: productId } })
      .then(function (product) {
        console.log('update success');
        if (product) {
          console.log('found productuct', product);
          product.update({
            price: price,
            quantity: quantity
          })
          .then(function () {
            return res.status(200).json({
              status: "SUCCESS",
              message: "Product Updated Successfully"
            })
          });
        }
        
      })
      .catch(function (err) {
        console.log('failed update', err);
        return res.status(500).json({
          status: "FAILED",
          message: "Error processing request, please try again",
          Error: err.toString()
        })
      })


    function update(req, res) {
      var { productId } = req.params
      var { price, quantity } = req.body
      models.Product.findOne({
        where: {
          id: productId
        },
        attributes: [
          "id",
          "strain",
          "price",
          "size",
          "quantity",
          "type",
          "genetics",
          "flavor"
        ]
      })
        .then(function (foundProduct) {
          if (foundProduct) {
            const value = {
              price: price || foundProduct.price,
              quantity: quantity || foundProduct.quantity,
            }
            foundProduct.update(value, {
              where: {
                id: foundProduct.dataValues.id
              }
            })
              .then(function (updatedProduct) {
                res.render("partials/products/products-update", { product: updatedProduct, messages: req.flash("info", "product fetched successfully") });

                // return res.status(200).json({
                //   status: "SUCCESS",
                //   message: "Product has been updated Successfully",
                //   data: updatedProduct
                // })
              })
          }
          // else {
          //   res.status(404).json({
          //     message: "Product not found or has been deleted"
          //   });
          // }
        })
        .catch(function (err) {
          res.status(500).json({
            status: "FAILED",
            message: "Error processing request, please try again",
            Error: err.toString()
          });
        });
    }
    }
    static delete(req, res){
      const { productId } = req.params;
      models.Product.findOne({
        where: {
          id: productId
        },
        attributes: ["id", "strain"]
      })
        .then(function (foundProduct) {
          if (foundProduct) {
            models.Product.destroy({
              where: {
                id: productId
              }
            })
              .then(function () {
                return res.status(200).json({
                  status: "SUCCESS",
                  message: "Product deleted successfully"
                });
              });
          }
          else {
            res.status(404).json({
              status: "FAILED",
              message: "Product not found or has been deleted"
            });
          }
        })
        .catch(function (err) {
          res.status(500).json({
            status: "FAILED",
            message: "Error processing request, please try again",
            Error: err.toString()
          });
        });
      }
  }
  module.exports = ProductController
