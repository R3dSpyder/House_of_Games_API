### INTRODUCTION

Northcoders Bootcamp: THe House of Games API portfolio project. Personal demonstration of proficiency in the following backend and testing frameworks: Node.js, postgres SQL, Express, Jest.

Frameworks that are featured to a lesser extent are : Supertest, Husky.

NOTE: This is meant for employment purposes and is not designed as a live project. There will be no support provided and no future updates.

### FUNCTION

The API is a RESTful API for a front end application that accepts GET, POST, PUT, DELETE requests. The accompanying front end application will be a forum on the topic of board games and allows for user registration, posting and voting etc.

## NAMING CONVENTIONS

This project follows model-view-controller principles. 

The controllers begin with 'get', 'post' 'delete', 'patch'.
The models begin with 'fetch', 'make', 'remove', 'put'.

###  RUN DEPENDENCIES

1. Node.js
2. Express : npm install express
3. Node-Postgres : npm install pg

### DEV DEPENDENCIES

4. Jest: npm install -D jest
5. Supertest : npm install -D supertest
6. Husky: npx husky-init && npm install


### SETUP:

Please follow these steps in order after you have installed the dependencies above.

1)In the .env.development file, place the following sentence inside: PGDATABASE=nc_games.
2)In the .env.test file, place the following sentence inside: PGDATABASE=nc_games_test.
4)Run 'npm run prepare' to set-up Husky hooks.
3)Run 'npm run setup-dbs' to create the databases- make sure you have pre-configured your environment to access your local db.


### INSTRUCTIONS FOR USE
