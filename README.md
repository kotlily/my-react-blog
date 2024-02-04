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
Backend, written in Express js, has multiple endpoints to allow UI to communicate.<br>
Backend is communicating with the database<br>
*Backend will also require some env variables.  Please see README.md in my-blog-backend folder.*


## Database
MongoDB is used for the database.  Currently it is hosted via MongoDB Atlas (on AWS).

<br><br>

# Docker - Operational Instructions

### Prerequisites
* Docker
    * Windows - https://docs.docker.com/desktop/install/windows-install/
    * Linix - https://docs.docker.com/desktop/install/linux-install/

### Docker login
`docker login`

### Building a Docker image
`docker image build -t kotlily/my-blog-react-express:latest .`

### Setup env variables
Fill in your values
```
# Environment Variables
export APP_PORT=8000
export MONGO_DB_NAME=database_name
export MONGO_CONNECTION_STRING_PREFIX="mongodb+srv://"
export MONGO_CONNECTION_STRING_OPTIONS="retryWrites=true&w=majority"
# Secrets
export MONGO_USERNAME=
export MONGO_PASSWORD=
export MONGO_CONNECTION_STRING_CLUSTER_URL=
export FIREBASE_CREDENTIALS=<json as a single line string: {"name1": "value1", "name2": "value2"}>
```
### Creating a container
We are running here with a different port (8001) in case we are also running locally (defaulted to 8000)<br>

`docker run -dp 8001:8000 --name my-blog kotlily/my-blog-react-express:latest`

### Creating a container with env vars coming from a file
You can also put env variables in .env file and source it from commandline

`docker run --env-file .env -dp 8001:8000 --name my-blog kotlily/my-blog-react-express:latest`

### Pushing a container to Docker Hub
`Example: docker push <account>/<name>:<label>`

```
docker push kotlily/my-blog-react-express:latest
```

Please note that you can/should consider using proper version instead of tag `latest`

### Using docker-compose instead of docker run
docker-compose will read docker-compose.yaml file to operate accordingly<br>
It will remove the need to supply things via command-line when comparing to docker commands<br>

#### TODO
- [ ] Change docker-compose.yaml to use secrets from .env and not secrets files

#### To create/re-create and run the container
```
docker-componse up -d`
```

This docker-compose example will spin up 3 instances of the backend and have nginx loadbalancing in front of it via exposed port 4000<br>
Check nginx.conf file for more details

#### To stop or destroy the container<br>
```
docker-compose stop|down
```

<br><br>

# Kubernetes - Operational Instructions

## Deploy to a minikube cluster

### Prerequisites
* minikube - Please read docs/minikube.md file for details about setting up minikube cluster
* kubectl - 


### Deployment - kubectl

#### Prepare and apply secrets for k8s cluster

##### Fill in your k8s-my-blog-secretes.yaml

###### Example of the file content

```
# Secrets for the kubernetes cluster
# Fill in your data values in b64 encoding
apiVersion: v1
kind: Secret
metadata:
  name: k8s-secrets
type: Opaque
data:
  MONGO_USERNAME: <b64 encoded mongodb user>
  MONGO_PASSWORD: <b64 encoded mongodb password>
  MONGO_CONNECTION_STRING_CLUSTER_URL: <b64 encoded mondodb cluster URL>
  FIREBASE_CREDENTIALS: <b64 encoded json string>
```

##### Create secrets in the cluster

`kubectl apply -f k8s-my-blog-secrets.yaml`

###### Output in console
```
secret/k8s-my-blog-secrets created
```

##### Check the secrets creation
```
kubectl describe secret/k8s-my-blog-secrets
```

###### Output in console

```
Name:         k8s-my-blog-secrets
Namespace:    default
Labels:       <none>
Annotations:  <none>

Type:  Opaque

Data
====
MONGO_CONNECTION_STRING_CLUSTER_URL:  33 bytes
MONGO_PASSWORD:                       16 bytes
MONGO_USERNAME:                       11 bytes
FIREBASE_CREDENTIALS:                 2279 bytes
```

##### Secrets are used in a cluster via env setup

###### Added in k8s yaml file within containers spec in *k8s-my-blog.yaml* file after env variables

```
        env:
        - name: APP_PORT
          value: "8000"
        - name: MONGO_DB_NAME
          value: "react-blog-db"
        - name: MONGO_CONNECTION_STRING_PREFIX
          value: "mongodb+srv://"
        - name: MONGO_CONNECTION_STRING_OPTIONS
          value: "retryWrites=true&w=majority"
        # Secrets
        - name: MONGO_USERNAME
          valueFrom:
            secretKeyRef:
              name: k8s-my-blog-secrets
              key: MONGO_USERNAME
        - name: MONGO_PASSWORD
          valueFrom:
            secretKeyRef:
              name: k8s-my-blog-secrets
              key: MONGO_PASSWORD
        - name: MONGO_CONNECTION_STRING_CLUSTER_URL
          valueFrom:
            secretKeyRef:
              name: k8s-my-blog-secrets
              key: MONGO_CONNECTION_STRING_CLUSTER_URL
        - name: FIREBASE_CREDENTIALS
          valueFrom:
            secretKeyRef:
              name: k8s-my-blog-secrets
              key: FIREBASE_CREDENTIALS
```

#### Ready to deploy to k8s cluster

```
kubectl apply -f k8s-my-blog.yaml
```

##### Observe your cluster via dashboard

`minikube dashboard`

##### Or manually check your cluster health

```
$ kubectl get deploy
NAME      READY   UP-TO-DATE   AVAILABLE   AGE
my-blog   2/2     2            2           57s
```

```
$ kubectl get svc
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          80m
my-blog      LoadBalancer   10.105.149.38   <pending>     3333:31334/TCP   62s
```
NOTE: Take a note of a Loadbalancer external port *31334* that will be used to access your application

```
$ kubectl get pods -o wide
$ kubectl get pods -o wide
NAME                       READY   STATUS    RESTARTS   AGE     IP           NODE       NOMINATED NODE   READINESS GATES
my-blog-768748ccb9-2tf7c   1/1     Running   0          3m14s   10.244.0.8   minikube   <none>           <none>
my-blog-768748ccb9-wr5dw   1/1     Running   0          3m14s   10.244.0.7   minikube   <none>           <none>
```

```
$ kubectl logs my-blog-768748ccb9-2tf7c

> my-blog-backend@1.0.0 start
> node src/server.js

Successfully connected to database
Server is listening on port 8000
```

```
$ kubectl logs my-blog-768748ccb9-wr5dw

> my-blog-backend@1.0.0 start
> node src/server.js

Successfully connected to database
Server is listening on port 8000
```

#### Check the application by accessing it via exposed IP:port

##### Get your minikub IP address

`minikube ip`

###### Output
`172.21.45.218`

##### Use LoadBalancer port from above steps to access app

`http://172.21.45.218:31334/`

##### Or fire it up via minikube
Minikube will automatically fire up a browser with the correct IP:port

`minikube service my-blog`

```
minikube service my-blog
|-----------|---------|-------------|----------------------------|
| NAMESPACE |  NAME   | TARGET PORT |            URL             |
|-----------|---------|-------------|----------------------------|
| default   | my-blog |        3333 | http://172.21.45.218:31334 |
|-----------|---------|-------------|----------------------------|
🎉  Opening service default/my-blog in default browser...
```

<br><br>

### Deployment to a minikube cluster - HELM

#### Prerequisites
* kubernetes cluster - already covered by minikube
* Helm - https://helm.sh/docs/intro/install/
    * Run `helm version` to see that it is installed
    * Run `helm list -a` to see any installed charts (there won't be any from the start)


### Helm Chart Setup
All helm related files are in `my-blog-helm` folder.<br>
Initially helm chart was created with `helm create my-blog-helm` command.<br>
Then customizations were made to the following files

#### Chart.yaml
```
Changed appVersion attribute to latest, but in real life you would specify and change a version every time app changes
```


#### values.yaml
```
    repository: # changed to reflect the image name
    nameOverride:
    fullnameOverride: # both can be changed to reflect a new chart name

    # changed type to LoadBalancer and set port (what will be exposed) and target port (application container port)
    # this is similar to what was in the k8s-my-blog.yaml used by kubectl
    service:
      type: LoadBalancer
      port: 3333
      targetPort: 8000

    # Made sure to set limits on resources
      limits:
        cpu: 250m
        memory: 128Mi

    # Environment variables to be passed to our template, including secrets
    # These will be utilized in templates/deployment.yaml and some passed as a commandline args
    APP_PORT: 8000
    MONGO_DB_NAME: mongo_db_name
    MONGO_CONNECTION_STRING_PREFIX: "mongodb+srv://"
    MONGO_CONNECTION_STRING_OPTIONS: "retryWrites=true&w=majority"
    # Secrets
    MONGO_USERNAME: username
    MONGO_PASSWORD: password
    MONGO_CONNECTION_STRING_CLUSTER_URL: cluster-url
    FIREBASE_CREDENTIALS: firebase-credentials    

```

#### templates/secrets.yaml
```
# Created new file which will serve as a template to describe secrets.
# It will be mimicking how k8s-my-blog-secrets.yaml was created for kubectl deployment

Please note that due to an issue in helm to handle json strings as env parameters,
we don't base64 encode it in yaml, but will do it prior to passing to helm via CLI

  MONGO_CONNECTION_STRING_CLUSTER_URL: {{ .Values.MONGO_CONNECTION_STRING_CLUSTER_URL | b64enc }}
  FIREBASE_CREDENTIALS: {{ .Values.FIREBASE_CREDENTIALS }}
```

#### templates/deployment.yaml
Env section was added under containers specs to utilize env for vars and secrets<br>
These values will be coming from values.yaml file as well as the secrets.yaml template<br>
*Please note that we are surrounding values with quotes<br>
Otherwise helm is trrowing this error upon installation, which does not show up in dry-run*
* Deployment in version "v1" cannot be handled as a Deployment: json: cannot unmarshal number into Go struct field EnvVar.spec.template.spec.containers.env.value of type string

```
          env:
            # environment variables
            - name: "APP_PORT"
              value: "{{ .Values.APP_PORT }}"
            - name: "MONGO_DB_NAME"
              value: "{{ .Values.MONGO_DB_NAME }}"
            - name: "MONGO_CONNECTION_STRING_PREFIX"
              value: "{{ .Values.MONGO_CONNECTION_STRING_PREFIX }}"
            - name: "MONGO_CONNECTION_STRING_OPTIONS"
              value: "{{ .Values.MONGO_CONNECTION_STRING_OPTIONS }}"            
            # secrets
            - name: "MONGO_USERNAME"
              valueFrom:
                secretKeyRef:
                  key:  "MONGO_USERNAME"
                  name: {{ .Release.Name }}-auth
            - name: "MONGO_PASSWORD"
              valueFrom:
                secretKeyRef:
                  key:  MONGO_PASSWORD
                  name: {{ .Release.Name }}-auth
            - name: MONGO_CONNECTION_STRING_CLUSTER_URL
              valueFrom:
                secretKeyRef:
                  key:  MONGO_CONNECTION_STRING_CLUSTER_URL
                  name: {{ .Release.Name }}-auth
            - name: FIREBASE_CREDENTIALS
              valueFrom:
                secretKeyRef:
                  key:  FIREBASE_CREDENTIALS
                  name: {{ .Release.Name }}-auth 
```

### Validating chart

Lint (validate syntax) of the newly created/modified chart
```
$ helm lint my-blog-helm
==> Linting my-blog-helm
[INFO] Chart.yaml: icon is recommended

1 chart(s) linted, 0 chart(s) failed
```

### Set your environment variables
These will be passed to your helm installation via command-line<br>
Make sure you specify your correct values
```
# Env vars
export APP_PORT=8000
export MONGO_DB_NAME=react-blog-db
export MONGO_CONNECTION_STRING_PREFIX="mongodb+srv://"
export MONGO_CONNECTION_STRING_OPTIONS="retryWrites=true&w=majority"
# Secrets
export MONGO_USERNAME=<usr>
MONGO_PASSWORD=<pwd>
MONGO_CONNECTION_STRING_CLUSTER_URL=something.mongodb.net/
FIREBASE_CREDENTIALS=<firebase_cred_json_string>

```

If you maintained `.env` file under `my-blog-backend` folder and you are using linux or git-bash,<br>
then you can use `helm.sh` script which  sources `.env`, then converts firebase json secret to base64<br>
and then executes helm as usual.

```
chmod 700 helm_install.sh  # make the file executable
./helm.sh <normal helm arguments>

./helm.sh install my-blog-release my-blog-helm
```

### Installation dry-run

```
$ helm install --set APP_PORT=${APP_PORT} \
               --set MONGO_DB_NAME=${MONGO_DB_NAME} \
               --set MONGO_CONNECTION_STRING_PREFIX=${MONGO_CONNECTION_STRING_PREFIX} \
               --set MONGO_CONNECTION_STRING_OPTIONS="${MONGO_CONNECTION_STRING_OPTIONS}" \
               --set MONGO_USERNAME=${MONGO_USERNAME} \
               --set MONGO_PASSWORD=${MONGO_PASSWORD} \
               --set MONGO_CONNECTION_STRING_CLUSTER_URL=${MONGO_CONNECTION_STRING_CLUSTER_URL} \
               --set FIREBASE_CREDENTIALS=${FIREBASE_CREDENTIALS} \
            my-blog-release my-blog-helm --debug --dry-run

install.go:214: [debug] Original chart version: ""
install.go:231: [debug] CHART PATH: C:\Users\ilyak\src\courses\react_website\my-blog-helm

NAME: my-blog-release
LAST DEPLOYED: Sat Feb  3 13:54:03 2024
NAMESPACE: default
STATUS: pending-install
REVISION: 1
USER-SUPPLIED VALUES:
{}
...
Here you will see generated yaml corresponding to your release
Note STATUS: pending-install
...
```

### Release Installation
As you run installation, you can pass env variables when running helm<br>
For that, first make sure those variables are set.

Example
```
export username=iambob
helm install --set username=${username} [chart name] [chart path]
```

For this specific installation

```
$ helm install --set APP_PORT=${APP_PORT} \
               --set MONGO_DB_NAME=${MONGO_DB_NAME} \
               --set MONGO_CONNECTION_STRING_PREFIX=${MONGO_CONNECTION_STRING_PREFIX} \
               --set MONGO_CONNECTION_STRING_OPTIONS="${MONGO_CONNECTION_STRING_OPTIONS}" \
               --set MONGO_USERNAME=${MONGO_USERNAME} \
               --set MONGO_PASSWORD=${MONGO_PASSWORD} \
               --set MONGO_CONNECTION_STRING_CLUSTER_URL=${MONGO_CONNECTION_STRING_CLUSTER_URL} \
               --set FIREBASE_CREDENTIALS=${FIREBASE_CREDENTIALS} \
               my-blog-release my-blog-helm
```

OR

```
$ ./helm.sh install my-blog-release my-blog-helm

```


<br><br>

## Deployment to EKS (AWS)

