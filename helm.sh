#!/bin/bash

# Source .env from the backend component

. .env

# Base64 encode the firebase credentials to pass it as a secret to the helm chart
# Use -w 0 to avoid line breaks in the base64 encoded string (wrapped at 76 characters by default)
# For helm, we will read FIREBASE_CREDENTIALS_HELM which will be wrapped with single quotes in the .env file
# Original variable name is FIREBASE_CREDENTIALS in the .env file is used for dotenv package in the backend component, whcih does not like single quotes
FIREBASE_CREDENTIALS_BASE64=$(echo -n ${FIREBASE_CREDENTIALS_HELM} | base64 -w 0)

helm $@ \
     --set APP_PORT=${APP_PORT} \
     --set MONGO_DB_NAME=${MONGO_DB_NAME} \
     --set MONGO_CONNECTION_STRING_PREFIX=${MONGO_CONNECTION_STRING_PREFIX} \
     --set MONGO_CONNECTION_STRING_OPTIONS="${MONGO_CONNECTION_STRING_OPTIONS_HELM}" \
     --set MONGO_USERNAME=${MONGO_USERNAME} \
     --set MONGO_PASSWORD=${MONGO_PASSWORD} \
     --set MONGO_CONNECTION_STRING_CLUSTER_URL=${MONGO_CONNECTION_STRING_CLUSTER_URL} \
     --set FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY} \
     --set FIREBASE_CREDENTIALS=${FIREBASE_CREDENTIALS_BASE64}
