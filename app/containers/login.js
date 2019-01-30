import React, { useState } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import { showMessage } from 'react-native-flash-message';
import { LinearGradient } from 'expo';
import style from './styles/login';
import { signIn } from './utils/util';

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            username,
            email,
            token
        }
    }
`
const REGISTRATION = gql`
    mutation registration($email: String!, $username: String!, $password: String!) {
        registration(email: $email, username: $username, password: $password) {
            username,
            email,
            token
        }
    }
`

const loginUpdate = (cache, { data: { login } }) => signIn(cache, login)
const registrationUpdate = (cache, { data: { registration } }) => signIn(cache, registration)

export default compose(
    graphql(LOGIN,
        {
            name: 'login',
            options: {
                update: loginUpdate,
                onError: () => showMessage({
                    message: 'Error',
                    type: 'danger'
                })
            }
        }
    ), 
    graphql(REGISTRATION, { name: 'registration', options: { update: registrationUpdate } })
)(Login);

function Login({ login, registration }) {
    const email = useFormInput('kerim1@gmail.com');
    const password = useFormInput('kerim1');
    const username = useFormInput('kerimlews');
    const firstName = useFormInput('Kerim');
    const lastName = useFormInput('Alihodza');
    const confirmPassword = useFormInput('');

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    /*if (loading)
        return <Text>Loading....</Text>*/

    return (
        <View>
            <View style={style.topLeftCorner}>
                <Text>Logo</Text>
            </View>
            <LinearGradient colors={['#e66465', '#9198e5']}  style={style.login}>
                <TextInput
                    {...email}
                    placeholder="Email"
                />
                <TextInput
                    {...username}
                    placeholder="Username"
                />
                <TextInput
                    {...password}
                    placeholder="Password"
                />
                {/* <TextInput
                    {...confirmPassword}
                    placeholder="Confirm password"
                />
                <TextInput
                    {...firstName}
                    placeholder="First name"
                />
                <TextInput
                    {...lastName}
                    placeholder="Last name"
                /> */}
                <View style={style.btnGroup} >
                    <View style={style.signBtn} >
                        <Button
                            onPress={() => {
                                setLoading(true);
                                login({ variables: { email: email.value, password: password.value }});
                            }}
                            text="Login"
                            style={style.loginBtn}
                        />
                        <Button
                            onPress={() => {
                                setLoading(true);
                                registration({ variables: { email: email.value, username: username.value, password: password.value }})
                            }}
                            text="Sign in"
                            style={style.loginBtn}
                        />
                    </View>
                    <Button
                        onPress={() => null}
                        text="Connect with facebook"
                        style={style.loginBtn}
                    />
                </View>
            </LinearGradient>
            <View style={style.rightLeftCorner}></View>
        </View>
    )
}

function useFormInput(defaultValue) {
    const [ value, setValue ] = useState(defaultValue);

    return {
        value,
        onChangeText: (e) => setValue(e),
        style: style.textInput,
        underlineColorAndroid: 'white'
    };
}
