import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ApolloProvider from 'config/apollo-provider';

import AppStack from 'routes/AppStack';
import SignIn from 'containers/SignIn';
import AuthLoading from 'routes/AuthLoadingScreen';
import Home from 'containers/Home'

const switchStackNavigator = createSwitchNavigator(
  {
    AuthLoading,
    App: AppStack,
    SignIn,
  },
  {
    initialRouteName: 'App'
  }
);

const Navigation = createAppContainer(switchStackNavigator);

export default function App() {
  return (
    <ApolloProvider>
        <Navigation />
    </ApolloProvider>
  );
}
