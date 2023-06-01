const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.users = require("./user.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);



  // const project = await db.projects.bulkCreate([
  //   {
  //     user_id: 40,
  //     title: "Project1",
  //     description: "Default Description",
  //     // user_id: 1
  //   },
  //   {
  //     title: "Project2",
  //     description: "Default Description",
  //     // user_id: 1
  //   },
  //   {
  //     title: "Project1",
  //     description: "Default Description",
  //     // user_id: 2
  //   },
  //   {
  //     title: "Project2",
  //     description: "Default Description",
  //     // user_id: 2
  //   },
  //   {
  //     title: "Project1",
  //     description: "Default Description",
  //     // user_id: 3
  //   },
  //   {
  //     title: "Project2",
  //     description: "Default Description",
  //     // user_id: 3
  //   },
  //   {
  //     title: "Project1",
  //     description: "Default Description",
  //     // user_id: 4
  //   },
  //   {
  //     title: "Project2",
  //     description: "Default Description",
  //     // user_id: 4
  //   },
  //   {
  //     title: "Project1",
  //     description: "Default Description",
  //     // user_id: 5
  //   },
  //   {
  //     title: "Project2",
  //     description: "Default Description",
  //     // user_id: 5
  //   }
  // ])



db.users.hasMany(db.projects, {
  foreignKey: 'user_id',
  as: 'project'
})

db.projects.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user'
})

module.exports = db;
