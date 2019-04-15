// module to implement crud for Product

var models = require('../models/index')
var Sequelize = require('sequelize')

var Op = Sequelize.Op

/**
 * @class ProductController
 * @desc A controller that handles all operations related to products
 */
class ProductController {

  /**
 * @static
 *  Method to get list of products
 * @param {*} request
 * @param {*} response
 * @memberof ProductCOntroller
 */

  static getAllProduct(req, res) {
    console.log('I got here')
    models.Product.findAll({
      attributes: [
        'id',
        'strain',
        'price',
        'size',
        'quantity',
        'type',
        'genetics',
        'flavor',
        'strain_type',
        'thc',
        'packaging',
        'cbd',
        'feelings',
        'comments',
        'alleviates'

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
      return response.status(500).json({
        status: 'FAILED',
        message: 'Error processing request, please try again',
        Error: err.toString()
      })
    })
  }

   /**
   * @static
   *  Method to get single products
   * @param {*} request
   * @param {*} response
   * @memberof ProductCOntroller
   */

  static getSingleProduct(req, res) {
    var { productId } = req.params
    models.Product.findOne({
      where: {
        "id": productId
      },
      attributes: [
        'id',
        'strain',
        'price',
        'size',
        'quantity',
        'type',
        'genetics',
        'flavor',
        'strain_type',
        'thc',
        'packaging',
        'cbd',
        'feelings',
        'comments',
        'alleviates'
      ]
    })
    .then( function(product){
      if(product){
        res.render('partials/products/products-update', { product: product, messages: req.flash('info', 'product fetched successfully') });

        // return res.status(200).json({
        //   "message": "Single product fetched successfully",
        //   "data": product
        // })
      }
      // return res.status(400).json({
      //   "message": "Product Id does not exist",
      //   "status": "Failed"
      // })
    })
    .catch(function(err){
      return res.status(500).json({
        status: 'FAILED',
        message: 'Error processing request, please try again',
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

  static addProduct(req, res){
    var {
      strain, price, flavor, size, quantity,
      genetics, type, strain_type, cbd,
      packaging, thc, alleviates, comments, feelings
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
    .spread(function(product, created){
      if(!created){
        // res.status(409).json({
        //   "message": "product already exist",
        //   "status": "Failed"
        // })
        req.flash('info', 'Product already exists')
        res.redirect('/home')
      } else {
        // res.status(201).json({
        //   "message": "product created successfully",
        //   "status": "Success",
        //   "data": product
        // })
        req.flash('info', 'A new product has been added')
        res.redirect('/home')
      }
    }).catch(function(err){
      return res.status(500).json({
        status: 'FAILED',
        message: 'Error processing request, please try again',
        Error: err.toString()
      })
    // request.flash('info', 'Could not create do, please try again')
    // response.redirect('/create/dog')
    });
  }

   /**
 * @static
 * Method to search for productThe @param tag provides the name, type, and description of a function parameter.
 * @param {*} req
 * @param {*} res
 * @memberof ProductController
 */
  static searchProduct(req, res){
    var { strain } = req.query
    models.Product.findAll({
      where: {
        strain : strain
      },
      attributes: [
        'id',
        'strain',
        'price',
        'size',
        'quantity',
        'type',
        'genetics',
        'flavor',
        'strain_type',
        'thc',
        'packaging',
        'cbd',
        'feelings',
        'comments',
        'alleviates'
      ]
    })
    .then( function(product){
      if(product){
        return res.status(200).json({
          status: 'SUCCESS',
          message: 'Product Fetched Successfully',
          data: product
        })
      }
    })
    .catch(function(err){
      return res.status(500).json({
        status: 'FAILED',
        message: 'Error processing request, please try again',
        Error: err.toString()
      })
    })
  }

  /**
   * @static
   * Method to update a  product instance by Id
   * @param {*} req
   * @param {*} res
   * @memberof ProductController
   */
  static update(req, res) {
    var { productId } = req.params
    var {price, quantity} = req.body
    models.Product.findOne({
      where :{
        id: productId
      },
      attributes: [
        'id',
        'strain',
        'price',
        'size',
        'quantity',
        'type',
        'genetics',
        'flavor'
      ]
    })
    .then(function(foundProduct){
      if(foundProduct){
        const value = {
          price: price || foundProduct.price,
          quantity: quantity || foundProduct.quantity,
        }
        foundProduct.update(value, {
          where:{
            id: foundProduct.dataValues.id
          }
        })
        .then(function(updatedProduct){
          res.render('partials/products/products-update', { product: updatedProduct, messages: req.flash('info', 'product fetched successfully') });

          // return res.status(200).json({
          //   status: 'SUCCESS',
          //   message: 'Product has been updated Successfully',
          //   data: updatedProduct
          // })
        })
      }
      // else {
      //   res.status(404).json({
      //     message: 'Product not found or has been deleted'
      //   });
      // }
    })
    .catch(function(err) {
      res.status(500).json({
        status: 'FAILED',
        message: 'Error processing request, please try again',
        Error: err.toString()
      });
    });
  }

    /**
 * @static
 * Method to delete a product instance by Id
 * @param {*} req
 * @param {*} res
 * @memberof ProductController
 */
static delete(req, res){
  const { productId } = req.params;
  models.Product.findOne({
    where: {
      id: productId
    },
    attributes: ['id', 'strain']
  })
  .then(function(foundProduct){
    if(foundProduct){
      models.Product.destroy({
        where:{
          id: productId
        }
      })
      .then(function (){
        return res.status(200).json({
            status: 'SUCCESS',
            message: 'Product deleted successfully'
          });
        });
    }
    else{
      res.status(404).json({
        status: 'FAILED',
        message: 'Product not found or has been deleted'
      });
    }
  })
  .catch(function(err) {
    res.status(500).json({
      status: 'FAILED',
      message: 'Error processing request, please try again',
      Error: err.toString()
    });
  });
}
}




module.exports = ProductController