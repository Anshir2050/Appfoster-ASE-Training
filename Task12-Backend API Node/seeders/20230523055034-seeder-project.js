'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('projects', [{
        title: 'Default Project',
        description: 'I am Project',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
