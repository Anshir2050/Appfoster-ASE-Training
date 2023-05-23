'use strict';

// @type {import('sequelize-cli').Migration} 
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
       user_name: 'John Doe',
       description: 'I am a user created as seeder',
       published: false
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
