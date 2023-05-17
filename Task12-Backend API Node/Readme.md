
## For Unix machines 

The `project` bash script allows you to run some project related commands easily.

The application is run through docker container but for this project you would mostly need access to node/npm and the database. 

To make sure `project` script is executable run the following command in this directory 

`chmod +x project`


### Startup the project

`./project up`

Keep this command running to keep the services working. For other commands open up a new terminal window.

### Start the node project

`./project npm start`

### Node related commands


`./project node <command>`

e.g if you want to run `node -v` you do 

`./project node -v`

### npm related commands

`./project npm <command>`

e.g if you want to run `npm start` you do 

`./project npm start`


## Accessing database

Project includes adminer which should run on [localhost:8080](http://localhost:8080/adminer.php)

Login with username/password mentioned in src/app/config/db.config.js





