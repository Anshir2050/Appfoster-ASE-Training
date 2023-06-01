module.exports = app => {
  const users = require("../controllers/user.controller.js");
  // const projects = require("../controllers/project.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  // Get User Projects
  router.get("/getUserProjects/:id", users.getUserProjects);

  app.use('/api/users', router);
  // app.use('/api/projects', router);
};
