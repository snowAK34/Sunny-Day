"use strict";
module.exports = (sequelize, DataTypes) => {
  const Seed = sequelize.define("Seed", {
    strain: {
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
    date_rec: {
      type: DataTypes.DATEONLY,
    },
    company: {
      type: DataTypes.STRING,
    },
    comments: {
      type: DataTypes.STRING,
    }

  }, {timestamps: false});
  Seed.associate = function(models) {
    // associations can be defined here
  };
  return Seed;
};