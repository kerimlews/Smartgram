import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { navigation } from './stores/navigation';

const cache = new InMemoryCache({ addTypename: false });
const pubsub = new RedisPubSub();

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token
    },
  };
});

const httpLink = new HttpLink({ uri: 'http://192.168.1.11:4000'});
 // add client initial state
const clientState = withClientState({
  cache,
  defaults: {
    navigation
  }
})

export default new ApolloClient({
  link: ApolloLink.from([ authMiddleware, httpLink, clientState, pubsub ]),
  cache
})
