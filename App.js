import React, { useState, useEffect } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ApolloProvider from 'config/apollo-provider';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import registerForPushNotificationsAsync from 'config/registerForPushNotificationsAsync';
import { Notifications, Font } from 'expo';

import AppStack from 'routes/AppStack';
import SignIn from 'containers/SignIn';

export default function App() {

  const [ isLoadFont , setIsLoadFont ] = useState(true);

    useEffect(() => {
        loadFont();
        registerForPushNotificationsAsync();

        const _notificationSubscription = Notifications.addListener(_handleNotification);
    });

    _handleNotification = (notification) => {
        console.log('notification', notification)
    };

  async function loadFont() {
      await Font.loadAsync({
          'ubuntu': require('assets/fonts/Ubuntu-Regular.ttf'),
      });

      setIsLoadFont(false);
  }

  return (
    <ApolloProvider>
      <Query query={CHECK_TOKEN}>
        {
            ({ data: { checkToken }, loading, error, client }) => {

                if (loading || isLoadFont || checkToken == null)
                        return (
                            <View>
                                <ActivityIndicator />
                                <StatusBar barStyle="default" />
                            </View>
                        );
                    
                const isAuth = checkToken != null;
                const user = { ...checkToken, __typename: 'user' };                    
                const data = { user };

                client.writeData({ data });
            
                const Navigation = createAppContainer(createSwitchNavigator(
                  {
                    App: AppStack,
                    SignIn,
                  },
                  { initialRouteName: isAuth ? 'App' : 'SignIn' }
                ));

                return <Navigation />
            }
        }
        </Query>
    </ApolloProvider>
  );
}

const CHECK_TOKEN = gql`
  {
    checkToken
      {
        email
        username,
        firstName,
        lastName
      }
  }
`;

