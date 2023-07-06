# ChatApp

To run this app in AWS you must run the next commands. 

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

And in the services, you must find the external ip which you can use to enter the app in the browser.