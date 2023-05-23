module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
