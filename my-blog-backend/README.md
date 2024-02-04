# Getting started with creating backend for the react app

This project is running Express framework that will serve as backend for the blog app

## Prerequisites

### Initialize project
`npm init -y`

## Install other dependencies/modules

### Express (backend framework)

`npm install express`

### dotenv (to read .env file for env variables)
`npm install dotenv`

### MongoDB

`npm install mongodb`

### Install firebase-admin (for authentication)

`npm install firebase-admin`


### Run server code
`node src/server.js`

### add npm package to help auto-restart when new version of code is saved
(do it for DEV ONLY)

`npm install nodemon --save-dev`

Then to start server need to use this command

`npx nodemon src/server.js`

### Simplify the way we start the server
Modify package.json file and add a script

```
"scripts" : {
    ...
    "dev": no demon src/server.js",
    ...
}
```

Then you can use the following command to start backend:

`npm run dev`

Runs the app in the development mode and will be listening on the specified port (e.g. 8000)

Server port will be defined in .env file, but if not present it will default to 8000

## Required Environment variables
These could be stored in .env or set outside of the app or set in GitHub
#### Environment
```
APP_PORT=<Application Port: 8000>
MONGO_DB_NAME=<MongoDB Name: react-blog-db>
MONGO_CONNECTION_STRING_PREFIX=<MongoDB connection string prefix: mongodb+srv://>
MONGO_CONNECTION_STRING_OPTIONS="<MongoDB connection string options: retryWrites=true&w=majority">
```

#### Secrets
```
MONGO_USERNAME=<MongoDB usename>
MONGO_PASSWORD=<MongoDB password>
MONGO_CONNECTION_STRING_CLUSTER_URL=<MongoDB connection string cluster URL: <somename>.<someid>.mongodb.net/>
FIREBASE_CREDENTIALS=<Firebase credentials JSON string>
```
