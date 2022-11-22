'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json');
    data.ingredients.forEach(x => {
      delete x.id
      x.createdAt = new Date()
      x.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Ingredients', data.ingredients)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', null)
  }
};
