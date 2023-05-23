module.exports = app => {
    // const users = require("../controllers/user.controller.js");
    const projects = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
  
    // Create a new project
    router.post("/:id", projects.create);
  
    // Retrieve all projects
    router.get("/", projects.findAll);
    
    // Retrieve a single project with project_id
    router.get("/:id", projects.findOne);
  
    // Update a project with project_id
    router.put("/:id", projects.update)
  
    // Delete a Project with id
    router.delete("/:id", projects.delete);
  
    // Delete all projects
    router.delete("/", projects.deleteAll);
  
  
    app.use('/api/projects', router);
  };