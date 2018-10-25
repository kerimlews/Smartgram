import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { ApolloConsumer } from 'react-apollo';
import Button from 'components/Button';
import Navigation from 'components/Navigation';
import Content from 'components/Content';
import Stores from 'components/Stores';
import style from './styles/login';

function signOut(writeData) {
    try {
        AsyncStorage.setItem('token', null)
        writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}

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
                        onPress={() => null}
                        text="Sign out"
                    />
                </View>
            )
        }
    </ApolloConsumer>
)

export default Home