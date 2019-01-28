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

async function loadFont() {
    await Font.loadAsync({
        'ubuntu': require('../../assets/fonts/Ubuntu-Regular.ttf'),
    });
}

export default function Provider({ children }) {

    const { name , setname } = useState('');

    useEffect(() => {
        loadFont();
    });

    return (
        <ApolloProvider client={client}>
            <Query query={CHECK_TOKEN}>
                {
                    ({ data: { checkToken }, error, loading, client }) => {
                        if (loading)
                            return <Text>LOADINGGGG</Text>;
                    
                        client.writeData({ data: { ...checkToken, isAuth: checkToken != null } });

                        return children;
                }}
            </Query>
        </ApolloProvider>
    )
}
