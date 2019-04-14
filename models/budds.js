const Sequelize = require("sequelize");
const db = require("../config/database");


//  make models for seeds and products
const seed = sequelize.define("seed",{

  strain: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  thc: {
    type: Sequelize.STRING,
  },
  cbd: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  strain_type: {
    type: Sequelize.STRING,
  },
  genetics: {
    type: Sequelize.STRING,
  },
  flavor: {
    type: Sequelize.STRING,
  },
  feelings: {
    type: Sequelize.STRING,
  },
  alleviates: {
    type: Sequelize.STRING,
  },
  date_rec: {
    type: Sequelize.DATEONLY,
  },
  company: {
    type: Sequelize.STRING,
  },
  comments: {
    type: Sequelize.STRING,
  }
})

var product = sequelize.define("product",{

  strain: {
    type: Sequelize.STRING,
  },
  price:{
    type: Sequelize.FLOAT(10,2),
  },
  packaging:{
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  thc: {
    type: Sequelize.STRING,
  },
  cbd: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  strain_type: {
    type: Sequelize.STRING,
  },
  genetics: {
    type: Sequelize.STRING,
  },
  flavor: {
    type: Sequelize.STRING,
  },
  feelings: {
    type: Sequelize.STRING,
  },
  alleviates: {
    type: Sequelize.STRING,
  },
  comments: {
    type: Sequelize.STRING,
  },
})


module.exports


