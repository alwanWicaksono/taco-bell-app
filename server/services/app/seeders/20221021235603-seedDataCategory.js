'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json');
    data.categories.forEach(x => {
      delete x.id
      x.createdAt = new Date()
      x.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Categories', data.categories)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null)
  }
};
