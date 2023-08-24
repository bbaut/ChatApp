import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import express from "express";
import AuthAPI from "./data-source/authAPI.js";
import UsersAPI from "./data-source/usersAPI.js";
import ChatAPI from "./data-source/chatAPI.js";
import bodyParser from "body-parser"
import { parse } from "cookie-parse";
import cookieParser from "cookie-parser";
// import typeDefs from "./schema.js";
import { typeDef as Chat } from './Schemas/chat.js';
import { typeDef as User } from './Schemas/user.js';
import { typeDef as Subscription } from './Schemas/subscriptions.js';
import resolvers from "./resolvers.js";
import dotenv from "dotenv";
// import cors from "cors"

//configure the use of environment variables
dotenv.config();

const Server = async () => {

    const app = express();

    const port = process.env.PORT || 3001;

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({ 
        typeDefs: [Chat, User, Subscription], 
        resolvers 
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
      });

    const serverCleanup = useServer({ 
        schema,
        context: async (ctx) => {
            const { cache } = server;

            // const token = ctx.connectionParams.headers.authorization;
            const { token } = parse(ctx.extra.request.headers.cookie);

            let authUser;

            if(token) {
                authUser = await new AuthAPI().profile(token);
            }

            const dataSources = {
                authAPI: new AuthAPI({ cache }),
                usersAPI: new UsersAPI({ cache }),
                chatAPI: new ChatAPI({ cache }),
            };
            return {
                dataSources,
                authUser
            };
        }
    }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer}),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    })

    await server.start();

    app.use(
        "/graphql",
        cookieParser(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async({req, res}) => {
                const { cache } = server;

                // const token = req.headers.authorization || '';
                const { token } = req.cookies;

                let authUser;
                
                if(token) {
                    authUser = await new AuthAPI().profile(token);
                }

                const dataSources = {
                    authAPI: new AuthAPI({ cache }),
                    usersAPI: new UsersAPI({ cache }),
                    chatAPI: new ChatAPI({ cache }),
                };
                return {
                    authUser,
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