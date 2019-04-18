"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      strain: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT(10, 2),
      },
      packaging: {
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

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("products");
  }
};