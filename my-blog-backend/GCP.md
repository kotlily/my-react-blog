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

`gcloud config set project <project_id>`
 
#### Deploy to AppEngine
This will require configuring app.yaml on the source side, then execute this command at the root directory for backend

`gcloud app deploy`
