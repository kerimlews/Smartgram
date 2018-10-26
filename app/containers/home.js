import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import Button from 'components/Button';
import Error from 'components/Error';
import gql from 'graphql-tag';
import style from './styles/login';
import { asyncRemoveToken } from './utils/util';

async function signOut(client) {
    try {
        await asyncRemoveToken();
        await client.writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error while trying delete token', ex)
    }
}

const USER = gql`
    {
        username @client
        email @client
        token @client
    }
`;

const Home = () => (
    <Query query={USER}>
        {
            ({ loading, error, data, client }) => (
                <View>
                    { loading && <Text>Loading</Text>}
                    { error && <Error error={error} />}
                    <Text>
                        {data.username}
                        {data.email}
                    </Text>
                    <Button
                        style={style.loginBtn}
                        onPress={() => signOut(client)}
                        text="Sign out"
                    />
                </View>
            )
        }
    </Query>
);

export default Home;