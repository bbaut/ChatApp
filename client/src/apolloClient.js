import { ApolloClient, InMemoryCache, HttpLink, split} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const SERVER_URI = "/graphql";
const WS_URL =
   window.location.protocol === "https:"
    ? `wss://${window.location.host}/graphql`
    : `ws://${window.location.host}/graphql`;


const wsLink = new GraphQLWsLink(createClient({
    // url: 'ws://localhost/subscription',
    // url: 'ws://localhost:4000/graphql',
    url: "ws://chat-app.brandon/graphql",
    connectionParams: {
      credentials: "same-origin",
    },
  }));

const httpLink = new HttpLink({
    // uri: "http://localhost/graphql",
    // uri: "http://localhost:4000/graphql",
      uri: "http://chat-app.brandon/graphql",
      credentials: "same-origin",
})

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

const client = new ApolloClient ({
    link: splitLink,
    cache: new InMemoryCache()
})

export default client;