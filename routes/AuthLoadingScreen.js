import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import ApolloProvider from 'containers/apollo-provider';
import FlashMessage from 'react-native-flash-message';
import { CHECK_TOKEN } from './queries/apollo-provider';

const IS_AUTH = gql`
  {
    isAuth @client
  }
`;

export default function AuthLoadingScreen({ navigation }) {
    return (
        <ApolloProvider>
            <Query query={CHECK_TOKEN}>
                {
                    ({ data: { checkToken }, loading, error }) =>
                        if (loading)
                                return (
                                    <View>
                                        <ActivityIndicator />
                                        <StatusBar barStyle="default" />
                                    </View>
                                );
                                
                            if(isAuth)
                                navigation.navigate('App');
                            else
                                navigation.navigate('SignIn');
                            }
                    }
                    </Query>
                }
            </Query>
            <FlashMessage position="top" />
        </ApolloProvider>
    );
}
