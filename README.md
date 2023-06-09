# ChatApp

To start with this app, you should give envirenment variables to the services. 

`PORT = whateveryouwant`

Also, on the auth service, you must specify also the jsonwebtoken secret word. 

`JWT_SECRET = whateveryouwant`

In order to start using the app, you can run all the services with the command

`npm run dev`

and the client with 

`npm start`

In order to run the application with cors, not recommended nevertheless if it is necessary, on apolloClient.js in the src/ folder on the client, you
can uncomment the lines associated to the wsLink and httpLinks. 
Also on the middleware, within the src/ folder, on the server.js, there are the lines commented associated to the cors configuration. Just uncomment the
lines and run all services. 
You should be fine. 
