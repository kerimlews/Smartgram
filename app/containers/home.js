import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import Button from 'components/Button';
import Navigation from 'components/Navigation';
import Content from 'components/Content';
import Stores from 'components/Stores';
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
    <ApolloConsumer>
        {
            client => (
                <View style={style.home}>
                    <Navigation />
                    <Content />
                    <Stores />
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