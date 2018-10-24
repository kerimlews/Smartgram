import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { ApolloConsumer } from 'react-apollo';
import Button from 'components/Button';
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
            ({ writeData }) => (
                <View>
                    <Text>
                        Home
                    </Text>
                    <Button
                        style={style.loginBtn}
                        onPress={() => signOut(writeData)}
                        text="Sign out"
                    />
                </View>
            )
        }
    </ApolloConsumer>
)

export default Home