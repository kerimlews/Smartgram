import { ApolloProvider, Query } from 'react-apollo';
import React, { useEffect, useState } from 'react';
import { Font } from 'expo';
import { Text, Platform, StyleSheet } from 'react-native';
import client from 'config/client';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from 'config/registerForPushNotificationsAsync';

export default function Provider({ children }) {

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
        <ApolloProvider client={client} style={style.container}>
            {children}
        </ApolloProvider>
    );
}

style = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 0 : 25,
    }
})