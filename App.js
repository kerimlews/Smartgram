import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import Home from 'containers/home';
import Login from 'containers/login';
import { Font } from 'expo';

async function loadFont() {
  await Font.loadAsync({
      'ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
  });
}


const client = new ApolloClient({ uri: 'http://10.45.166.62:4000',
  clientState: {
    defaults: {
      isAuth: false,
      name: 'KERIM',
      async loadFont()
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
  <ApolloProvider client={client}>
    <Query query={IS_AUTH}>
    {
      ({ data: { isAuth } } => (
          isAuth
           ? <Home />
           : <Login style={styles.container} />
      )
    }
    </Query>
  </ApolloProvider>
)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
