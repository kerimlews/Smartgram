import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import gql from 'graphql-tag';
import { ApolloProvider, Query } from 'react-apollo';
import Home from 'containers/home';
import Login from 'containers/login';
import { Font } from 'expo';
import client from './config/client';

const IS_AUTH = gql`
  {
    isAuth @client
  }
`
const CHECK_TOKEN = gql`
  {
    checkToken
  }
`

class App extends Component {

  componentWillMount() {
    Font.loadAsync({
        'ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={CHECK_TOKEN} >
        {({ data: { checkToken }, error, loading: loadingCheck, client }) => {
          if (loadingCheck)
          return <Text>LOADINGGGG</Text>

          return (
        <Query query={IS_AUTH}>
        {({ data: { isAuth }, error, loading }) => {

            if (loading)
              return <Text>LOADINGGGG</Text>
            console.log(checkToken, isAuth)
            return (
              checkToken && isAuth
               ? <Home style={{ fontFamily: 'ubuntu' }}/>
               : <Login style={styles.container} /> );

               
        }}</Query>
        )}}</Query>
      </ApolloProvider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App
