'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../db.json');
    data.items.forEach(x => {
      delete x.id
      x.createdAt = new Date()
      x.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Items', data.items)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null)
  }
};
