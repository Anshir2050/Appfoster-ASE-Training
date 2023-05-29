module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    user_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
  });

  return User;
};
