import { ApolloProvider, Query } from 'react-apollo';
import React, { useEffect, useState } from 'react';
import { Font } from 'expo';
import { Text, Platform, StyleSheet } from 'react-native';
import gql from 'graphql-tag';
import client from 'config/client';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from './registerForPushNotificationsAsync';

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
`

export default function Provider({ children }) {

    const [ isLoadFont , setIsLoadFont ] = useState(true);

    useEffect(() => {
        loadFont();
        registerForPushNotificationsAsync();

        _notificationSubscription = Notifications.addListener(_handleNotification);

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
        <ApolloProvider client={client} style={style.container}>
            <Query query={CHECK_TOKEN}>
                {
                    ({ data: { checkToken }, error, loading, client }) => {
                        if (loading || isLoadFont)
                            return <Text>LOADINGGGG</Text>;
                        console.log(checkToken);
                        client.writeData({ data: { user: { ...checkToken, __typename: 'user' }, isAuth: checkToken != null } });

                        return children;
                }}
            </Query>
        </ApolloProvider>
    );
}

style = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 0 : 25,
    }
})
