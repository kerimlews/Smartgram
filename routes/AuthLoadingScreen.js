import React, { useEffect, useState }  from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ActivityIndicator, StatusBar, View, Text, Button } from 'react-native';
import { Notifications, Font } from 'expo';
import registerForPushNotificationsAsync from 'config/registerForPushNotificationsAsync';

export default function AuthLoadingScreen({ navigation }) {

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
                    
                    if (!isAuth)
                        navigation.navigate('SignIn')

                    const user = { ...checkToken, __typename: 'user' };                    
                    const data = { user };

                    client.writeData({ data });
                    navigation.navigate('App')

                return null;
            }
        }
        </Query>
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

