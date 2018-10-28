import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';
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
  query checkToken($token: String) {
    checkToken(token: $token)
  }
`

class App extends Component {
  state = {
    token: null,
    loadingToken: false,
    errorToken: null
  }

  componentWillMount() {
    this.fetchToken();
    Font.loadAsync({
        'ubuntu': require('./assets/fonts/Ubuntu-Regular.ttf'),
    });
  }

  fetchToken = async () => {
    this.setState({ loadingToken: true })
    try {
      const token = await AsyncStorage.getItem('token');
      this.setState({ token, loadingToken: false })
     } catch (error) {
       this.setState({ token: null, loadingToken: false, errorToken: error })
     }
  }

  render() {
    const { loadingToken, errorToken, token } = this.state;

    return (
      <ApolloProvider client={client}>
       {
         <Query query={CHECK_TOKEN} variables={{ token }} >
          {
            ({ data: { checkToken }, error, loading }) => {
              if (loading || loadingToken)
                return <Text>LOADINGGGG</Text>
              return (
                checkToken
                 ? <Home style={{ fontFamily: 'ubuntu' }}/>
                 : <Login style={styles.container} />
            )}
          }
          </Query>
       }
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
