import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PATCH, OPTIONS, GET, REMOVE',
        'Access-Control-Allow-Credentials': true,
    },
    fetch
})

const client = new ApolloClient ({
    link: httpLink,
    cache: new InMemoryCache()
})

export default client;