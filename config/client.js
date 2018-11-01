import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import { navigation } from './stores/navigation';

const cache = new InMemoryCache({ addTypename: false });

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  console.log('token', token);
  return {
    headers: {
      ...headers,
      authorization: token
    },
  };
});

const httpLink = new HttpLink({ uri: 'http://10.45.166.62:4000'});
 // add client initial state
const clientState = withClientState({
  cache,
  defaults: {
    isAuth: false,
    navigation
  }
})

export default new ApolloClient({
  link: ApolloLink.from([ authMiddleware, httpLink, clientState ]),
  cache
})
