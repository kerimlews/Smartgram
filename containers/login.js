import React from 'react';
import { View, TextInput, Button, ImageBackground } from 'react-native';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import style from './styles/login';

const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) @client
    }
`

const Login = () => {
    let username = React.createRef();
    let password = React.createRef();

    return (
    <Mutation mutation={LOGIN}>
        {
            login => (
                <ImageBackground source={require('../assets/login.jpg')} style={style.login}>
                    <TextInput
                        style={style.textInput}
                        onChangeText={(text) => username.value = text}
                        value={username.value}
                        ref={usernameRef => username = usernameRef}
                    />
                    <TextInput
                        style={style.textInput}
                        onChangeText={(text) => password.value = text}
                        value={password.value}
                        ref={passwordRef => password = passwordRef}
                    />
                    <Button
                        onPress={() => login({ variables: { 
                            username: username.value,
                            password: password.value
                        }},
                        username.value = '',
                        password.value = '')}
                        title="Login"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </ImageBackground>
            )
        }
    </Mutation>
)}

export default Login