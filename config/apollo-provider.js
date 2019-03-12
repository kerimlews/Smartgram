import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, StyleSheet, View } from 'react-native';
import client from 'config/client';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Provider({ children }) {
    return (
        <ApolloProvider client={client} style={style.container}>
            <PaperProvider>
                <View style={style.container}>
                    {children}
                    <FlashMessage position="top" />
                </View>
            </PaperProvider>
        </ApolloProvider>
    );
}

style = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 0 : 25,
    }
})