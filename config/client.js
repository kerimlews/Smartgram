import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink  } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id })
    }
  }
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem('token');
  console.log(token);
  operation.setContext({
    headers: {
      authorization: token
    }
  });
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);
const httpLink = createHttpLink({ uri: 'https://10.45.166.62:4000' });

export default new ApolloClient({
  cache,
  httpLink,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
      //  sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
      //  logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isAuth: false
      },
      resolvers: {
        Mutation: {

        }
      },
      cache
    })
  ])
});
