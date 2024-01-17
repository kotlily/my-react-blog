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

