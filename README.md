# ChatApp

## Docker compose

To deploy this app in docker-compose, follow these steps: 

In the auth_service, users_services & chat_service, create a .env file 
with the next env variables: 

`PORT = 4001`
`PORT = 4002`
`PORT = 4003`

respectively, and

`MONGO_HOST = mongo`

for each one. Also, for the auth_service, add the next environmental variable

`JWT_SECRET`

with your own choice for a secret key.

For the middleware gateway, please create also an .env file with the next 

`PORT = 4000`
`AUTH_BASE_URL = 'http://auth:4001/'`
`USERS_BASE_URL = 'http://users:4002/'`
`CHAT_BASE_URL = 'http://chat:4003/'`

Next, go to the root folder, where you can find the docker-compose.yml file 
and run 

`docker-compose up --build`

Then, if you go to the browser, to localhost, you must be able to 
watch the app running. 

## Minikube

To deploy this app in Minikube you must run the next commands. 

Go to the k8s folder. 
`cd k8s`

Within this folder, you must run the next 
`kubectl apply -f database-persistent-volume-claim.yml`
`kubectl apply -f persistent-volume.yml`
`kubectl apply -f mongo-deployment.yml`
`kubectl apply -f mongo-service.yml`
`kubectl apply -f nginx-configMap.yml`
`kubectl apply -f client-deployment.yml`
`kubectl apply -f client-service.yml`
`kubectl apply -f middleware-deployment.yml`
`kubectl apply -f middleware-service.yml`
`kubectl apply -f auth-deployment.yml`
`kubectl apply -f auth-service.yml`
`kubectl apply -f chat-deployment.yml`
`kubectl apply -f chat-service.yml`
`kubectl apply -f users-deployment.yml`
`kubectl apply -f users-service.yml`

Then, you can verify that everything is correct using the next command

`kubectl get all`

Once each POD is running, expose the service with

`minikube service nginx`