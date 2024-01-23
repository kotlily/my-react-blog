# This is my first Blog Application
This project contains front-end (React.js code), back-end (Express js), and MongoDB (database)

## Web UI
React.js has a nav bar with access to home, about and articles pages.
It also allows you to login as a user, which is authenticated against firebase
Articles list allows you to see summary of all blogs and clicking into one,
will take you to the full page.
Each blog article page shows off the text and comment, which user can provide.
Upvoting is also present.

## Backend
Backend, written in Express js, has multiple endpoints to allow UI to communicate.
Backend is communicating with the database

## Database
MongoDB is used for the database.  Currently it is hosted via MongoDB Atlas (on AWS).


# Operational Instructions

### Building a Docker image
`docker image build -t my-blog-test-image:latest .`

### Creating a container
`docker run -dp 8001:8000 --name my-blog-test-image my-blog-test-image:latest`

### Using docker-compose instead of docker run
docker-compose will read docker-compose.yaml file to operate accordingly<br>
It will remove the need to supply things via command-line

To create/re-create and run the container<br>
`docker-componse up -d`

This docker-compose example will spin up 3 instances of the backend and have nginx loadbalancing in front of it via exposed port 4000<br>
Check nginx.conf file for more details

To stop or destroy the container<br>
`docker-compose stop|down`

