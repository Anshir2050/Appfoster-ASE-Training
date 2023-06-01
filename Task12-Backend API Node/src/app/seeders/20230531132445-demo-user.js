db = require('../models/')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(db.users, [{
       user_name: 'John Doe',
       email: 'John_Doe@gmail.com',
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete(db.users, null, {});
     
  }
};
