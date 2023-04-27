import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import express from "express";
import AuthAPI from "./data-source/authAPI.js";
import bodyParser from "body-parser"
import http from "http"
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import dotenv from "dotenv";
import cors from "cors"

//configure the use of environment variables
dotenv.config();

const Server = async () => {

    const app = express();

    const port = process.env.PORT || 3001;

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    })

    await server.start();

    app.use(
        "/graphql",
        cors ({ origin: ['http://localhost:3000'] }),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async({req, res}) => {
                const { cache } = server;
                const dataSources = {
                    authAPI: new AuthAPI({ cache }),
                };
                return {
                    req,
                    res,
                    dataSources
                }
            }
        })

    )

    httpServer.listen(port, () => {
        console.log(`🚀  Server ready at http://localhost:${port}/graphql`);
    });
}

  export default Server