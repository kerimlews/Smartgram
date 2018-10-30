import ApolloClient from 'apollo-boost';

import { navigation } from './stores/navigation';

export default new ApolloClient({ uri: 'http://192.168.0.10:4000',
  clientState: {
    defaults: {
      isAuth: false,
      navigation
    },
    resolvers: {
      Mutation: {
        login: (_, { username, password }, { cache }) => {
          console.log('asdsa', username, password)
        }
      }
    },
  }
});
