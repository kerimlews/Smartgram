import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { AsyncStorage } from 'react-native';
import { from } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { navigation } from './stores/navigation';

const cache = new InMemoryCache({ addTypename: false });

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token
    },
  };
});

const httpLinkUrl = new HttpLink({ uri: 'http://10.45.166.68:4000'});
 // add client initial state
const clientState = withClientState({
  cache,
  defaults: {
    navigation
  }
})

export default new ApolloClient({
  link: from([httpLinkUrl, authMiddleware, clientState]),
  cache
})
