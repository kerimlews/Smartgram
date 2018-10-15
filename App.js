import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import Home from './containers/home';
import Login from './containers/login';

const client = new ApolloClient({ uri: 'https://localhost:4000',
  clientState: {
    defaults: {
      isAuth: false,
      name: 'KERIM'
    },
    resolvers: {
      Mutation: {
        login: (_, { username, password }, { cache }) => {
          console.log('asdsa', username, password)
        }
      }
    }
  }
});

const IS_AUTH = gql`
  {
    isAuth @client
  }
`

const App = () => (
  <ApolloProvider client={client} >
    <Query query={IS_AUTH}>
    {
      ({ data: { isAuth } }) => (
        <View style={styles.container}>
          {
            isAuth ?
              <Home />
              :
              <Login />
          }
        </View>
      )
    }
    </Query>
  </ApolloProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App