// module to implement crud for Product

var models = require("../models/index")
var Sequelize = require("sequelize")

var Op = Sequelize.Op

/**
 * @class SeedController
 * @desc A controller that handles all operations related to seed
 */
class SeedController {

  /**
 * @static
 *  Method to get list of seeds
 * @param {*} request
 * @param {*} response
 * @memberof SeedController
 */

  static getAllSeed(req, res) {
    console.log("I got here")
    models.Seed.findAll({
      attributes: [
        "id",
        "strain",
        "date_rec",
        "quantity",
        "type",
        "genetics",
        "flavor",
        "strain_type",
        "thc",
        "cbd",
        "feelings",
        "comments",
        "alleviates",
        "company"
      ]
    })
    .then( function(seed){
      if(seed){
        return res.status(200).json({
          "message": "all seed has been fetched successfully",
          "data": seed
        })
      }
    })
    .catch(function(err){
      return response.status(500).json({
        status: "FAILED",
        message: "Error processing request, please try again",
        Error: err.toString()
      })
    })
  }

   /**
   * @static
   *  Method to get single seed
   * @param {*} req
   * @param {*} res
   * @memberof SeedController
   */

  static getSingleSeed(req, res) {
    var { seedId } = req.params
    models.Seed.findOne({
      where: {
        "id": seedId
      },
      attributes: [
        "id",
        "strain",
        "date_rec",
        "quantity",
        "type",
        "genetics",
        "flavor",
        "strain_type",
        "thc",
        "cbd",
        "feelings",
        "comments",
        "alleviates",
        "company"
      ]
    })
    .then( function(seed){
      if(seed){
        res.render("partials/seeds/seeds-update", { seed: seed, messages: req.flash("info", "seed fetched successfully") });

        // return res.status(200).json({
        //   "message": "Single seed fetched successfully",
        //   "data": seed
        // })
      }
      else{
        req.flash("info", "The seed id does not exist")
        res.redirect("/home")
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

   /**
   * @static
   *  Method to add a new seed
   * @param {*} request
   * @param {*} response
   * @memberof SeedController
   */

  static addSeed(req, res){
    var {
      strain, flavor, quantity,
      genetics, type, strain_type, cbd,
      packaging, thc, alleviates, comments, feelings, date_rec, company
    } = req.body

    models.Seed.findOrCreate({
      where: {
        strain: strain
      },
      defaults: {
        strain, flavor, quantity: parseInt(quantity),
        genetics, type, strain_type, cbd,
        packaging, thc, alleviates, comments, feelings, date_rec, company
      }
    })
    .spread(function(seed, created){
      if(!created){
        req.flash("info", "Seed already exists")
        res.redirect("/home")
      } else {
        req.flash("info", "A new seed has been added")
        res.redirect("/home")
      }
    }).catch(function(err){
      return res.status(500).json({
        status: "FAILED",
        message: "Error processing request, please try again",
        Error: err.toString()
      })
    });
  }

   /**
 * @static
 * Method to search for product
 * @param {*} req
 * @param {*} res
 * @memberof ProductController
 */
  static searchSeed(req, res){
    var { strain } = req.query
    models.Product.findAll({
      where: {
        strain : strain
      },
      attributes: [
        "id",
        "strain",
        "date_rec",
        "quantity",
        "type",
        "genetics",
        "flavor",
        "strain_type",
        "thc",
        "cbd",
        "feelings",
        "comments",
        "alleviates",
        "company"
      ]
    })
    .then( function(seed){
      if(seed){
        // return res.status(200).json({
        //   status: "SUCCESS",
        //   message: "Seed Fetched Successfully",
        //   data: seed
        // })
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

  /**
   * @static
   * Method to update a  product instance by Id
   * @param {*} req
   * @param {*} res
   * @memberof ProductController
   */
  static update(req, res) {
    var { seedId } = req.params
    var {quantity} = req.body
    models.Seed.findOne({
      where :{
        id: seedId
      },
      attributes: [
        "id",
        "strain",
        "date_rec",
        "quantity",
        "type",
        "genetics",
        "flavor",
        "strain_type",
        "thc",
        "cbd",
        "feelings",
        "comments",
        "alleviates",
        "company"
      ]
    })
    .then(function(foundSeed){
      if(foundSeed){
        const value = {
          quantity: quantity || foundSeed.quantity,
        }
        foundSeed.update(value, {
          where:{
            id: foundSeed.dataValues.id
          }
        })
        .then(function(updatedSeed){
          return res.status(200).json({
            status: "SUCCESS",
            message: "Seed has been updated Successfully",
            data: updatedSeed
          })
        })
      }
      else {
        res.status(404).json({
          message: "Seed not found or has been deleted"
        });
      }
    })
    .catch(function(err) {
      res.status(500).json({
        status: "FAILED",
        message: "Error processing request, please try again",
        Error: err.toString()
      });
    });
  }

  /**
 * @static
 * Method to delete a seed instance by Id
 * @param {*} req
 * @param {*} res
 * @memberof SeedController
 */
static delete(req, res){
  const { seedId } = req.params;
  models.Seed.findOne({
    where: {
      id: seedId
    },
    attributes: ["id", "strain"]
  })
  .then(function(foundSeed){
    if(foundSeed){
      models.Seed.destroy({
        where:{
          id: seedId
        }
      })
      .then(function (){
        return res.status(200).json({
          status: "SUCCESS",
          message: "Seed deleted successfully"
        });
      });
    }
    else{
      res.status(404).json({
        status: "FAILED",
        message: "Seed not found or has been deleted"
      });
    }
  })
  .catch(function(err) {
    response.status(500).json({
      status: "FAILED",
      message: "Error processing request, please try again",
      Error: err.toString()
    });
  });
}
}


module.exports = SeedController