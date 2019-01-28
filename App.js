import React from 'react';
import { Query } from 'react-apollo';
import { StyleSheet, Text, View } from 'react-native';
import gql from 'graphql-tag';
import Home from 'containers/home';
import Login from 'containers/login';
import ApolloProvider from 'containers/apollo-provider';

const IS_AUTH = gql`
  {
    isAuth @client
  }
`
const App = () => (
  <ApolloProvider>
    <View>
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
    </View>
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