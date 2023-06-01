const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: true
};

app.set('view engine', 'ejs');
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
    const fun= async() => {
      const tab =  await db.users.count();
      if (tab > 0){
        return
      } 
      const user = await db.users.bulkCreate([{
        user_name: "User1",
        email:"user1@gmail.com"
      },
      {
        user_name: "User2",
        email:"user2@gmail.com"
      },
      {
        user_name: "User3",
        email:"user3@gmail.com"
      },
      {
        user_name: "User4",
        email:"user4@gmail.com"
      },
      {
        user_name: "User5",
        email:"user5@gmail.com"
      }
    ])
    const last = await db.users.findOne({
      order: [ [ 'id', 'DESC' ]],
      });
    
      const project = await db.projects.bulkCreate([
          {
            title: "Project1",
            description: "Default Description",
            user_id: last.id-4
          },
          {
            title: "Project2",
            description: "Default Description",
            user_id: last.id-4
          },
          {
            title: "Project1",
            description: "Default Description",
            user_id: last.id-3
          },
          {
            title: "Project2",
            description: "Default Description",
            user_id: last.id-3
          },
          {
            title: "Project1",
            description: "Default Description",
            user_id: last.id-2
          },
          {
            title: "Project2",
            description: "Default Description",
            user_id: last.id-2
          },
          {
            title: "Project1",
            description: "Default Description",
            user_id: last.id-1
          },
          {
            title: "Project2",
            description: "Default Description",
            user_id: last.id-1
          },
          {
            title: "Project1",
            description: "Default Description",
            user_id: last.id
          },
          {
            title: "Project2",
            description: "Default Description",
            user_id: last.id
          }
        ])
    }
    fun()
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// const path = require('path');

// module.exports = {
//   'config': path.resolve('config', 'config.json')
// }
// simple route
app.get("/", (req, res) => {
  res.render('pages/index');
  
});
app.get("/:id/projects/", (req, res) => {
  res.render('pages/index2');
  
});
app.use(express.static( "public" ))
require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

