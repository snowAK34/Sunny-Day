"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    strain: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
    },
    packaging: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    thc: {
      type: DataTypes.STRING,
    },
    cbd: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    strain_type: {
      type: DataTypes.STRING,
    },
    genetics: {
      type: DataTypes.STRING,
    },
    flavor: {
      type: DataTypes.STRING,
    },
    feelings: {
      type: DataTypes.STRING,
    },
    alleviates: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.STRING,
    },

  }, {});
  Product.associate = function (models) {
    // associations can be defined here
  };
  return Product;
};