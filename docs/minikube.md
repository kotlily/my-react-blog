# Setup minikube, k8s cluster and deploy blog to it

## Download and instal minikube

### Getting started
https://minikube.sigs.k8s.io/docs/start/


## Start minikube with a Hyper-V dirver

### Enable Hyper-V (windows)
In PowerShell prompt

`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`

### Start the cluster

`minikube start --driver=hyperv`



