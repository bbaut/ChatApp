import { ApolloClient, InMemoryCache, HttpLink, split, from} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(createClient({
    url: `ws://${window.location.host}/subscription`,
    connectionParams: {
      credentials: "same-origin"
    },
  }));

const httpLink = new HttpLink({
      uri: `http://${window.location.host}/graphql`,
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
    cache: new InMemoryCache({
      addTypename: false,
    }),
})

export default client;