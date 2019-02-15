import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { withClientState } from 'apollo-link-state';
import { navigation } from './stores/navigation';
import { user } from './stores/user';

const cache = new InMemoryCache({ addTypename: false });

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  return {
    headers: {
      ...headers,
      authorization: token
    },
  };
});

const httpLinkUrl = new HttpLink({ uri: 'http://10.45.166.68:4000'});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

 // add client initial state
const clientState = withClientState({
  cache,
  defaults: {
    user,
    navigation
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  link: ApolloLink.from([clientState, authMiddleware, link]),
  cache
})
