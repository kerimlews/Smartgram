import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Platform, StyleSheet, View } from 'react-native';
import client from 'config/client';
import FlashMessage from 'react-native-flash-message';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Provider({ children }) {
    return (
        <ApolloProvider client={client}>
            <PaperProvider>
                {children}
                <FlashMessage position="top" />
            </PaperProvider>
        </ApolloProvider>
    );
}
