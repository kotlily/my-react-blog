# Preparing the deployment to be hosted on GCP

### 1. Build front-end
This is done to include it in the backend runtime as part of the same app

`cd my-blog` <br>
`npm run build`

*build* folder will be created under my-blog

Copy newly built *build* folder to *my-blog-backend* dir<br>
and don't forget to add build dir to .gitignore file as you won't want to see it in Git<br>
You will also note that we'll need to make changes to server.js to be able to handle non-api call

`app.use(express.static(path.join(__dirname, '../build')));`

which will then serve your site as part of the back-end service deployed.


# Deploying application to GCP

## Prerequisites
### GCP Account
You will need a GCP account and a project setup.
If you used Firebase for the application, your project should be already available to be reused, you should see it from the GCP console:
https://console.cloud.google.com/

In order to enable the project for build/deploy to AppEngine, you will need to enable billing in GCP.

### GCP CLI
You will also need to install GCP CLI

https://cloud.google.com/sdk/docs/install

#### Authenticate GCP CLI 
After installation of GCP CLI, go to the project base folder,
Example: my-blog-back-end and authenticate yourself with below command.

`gcloud auth login`

This command will open up a browser window and let you finish login from there.
Once done, you can come back to the command line


#### GCP CLI Commands

List GCP CLI components

`gcloud components list`

#### Update all GCP components to latest

`gcloud components update`
 

## Deploy app to GCP Compute engine 

#### Switch to a project of choice 
Please make sure project is created and a project ID is noted<br>
It will be something like my-react-blog-7012a or whatever it gets derived from the project name you provided

`gcloud config set project <project_id>`
 
#### Deploy to AppEngine
This will require configuring app.yaml on the source side, then execute this command at the root directory for backend

`gcloud app deploy`

#### Make sure to clean-up or disable billing for the project when not in use to ensure $$ is not wasted