import React from 'react';
import { Query } from 'react-apollo';
import { StyleSheet, Text } from 'react-native';
import gql from 'graphql-tag';
import Home from 'containers/home';
import Login from 'containers/login';
import ApolloProvider from 'containers/apollo-provider';
import FlashMessage from 'react-native-flash-message';

const IS_AUTH = gql`
  {
    isAuth @client
  }
`;

const App = () => (
  <ApolloProvider>
    <Query query={IS_AUTH}>
      {
        ({ data: { isAuth }, error, loading }) => {
          if (loading)
            return <Text>LOADINGGGG</Text>
            
          return (
            isAuth
              ? <Home style={{ fontFamily: 'ubuntu' }}/>
              : <Login style={styles.container} />
          );
        }
      }
    </Query>
    <FlashMessage position="top" />
  </ApolloProvider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App;