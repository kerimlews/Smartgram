import { ApolloProvider, Query } from 'react-apollo';
import React, { useEffect, useState } from 'react';
import { Font } from 'expo';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import client from 'config/client';

const CHECK_TOKEN = gql`
  {
    checkToken
      {
        email
        username
      }
  }
`

export default function Provider({ children }) {

    const [ isLoadFont , setIsLoadFont ] = useState(true);

    useEffect(() => {
        loadFont();
    }, [isLoadFont]);

    async function loadFont() {
        await Font.loadAsync({
            'ubuntu': require('assets/fonts/Ubuntu-Regular.ttf'),
        });
        setIsLoadFont(false);
    }

    return (
        <ApolloProvider client={client}>
            <Query query={CHECK_TOKEN}>
                {
                    ({ data: { checkToken }, error, loading, client }) => {
                        if (loading || isLoadFont)
                            return <Text>LOADINGGGG</Text>;
                    
                        client.writeData({ data: { ...checkToken, isAuth: checkToken != null } });

                        return children;
                }}
            </Query>
        </ApolloProvider>
    );
}
