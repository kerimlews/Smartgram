import React, { useState, Fragment } from 'react';
import { View, TextInput, ImageBackground, Text, Image  } from 'react-native';
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
    /*if (loading)
        return <Text>Loading....</Text>*/
    
    const email = useFormInput('kerim1@gmail.com');
    const password = useFormInput('kerim1');
    const username = useFormInput('kerimlews');
    const firstName = useFormInput('Kerim');
    const lastName = useFormInput('Alihodza');
    const confirmPassword = useFormInput('');

    const [ isLogin, setLogin ]  = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    function handleSubmitForm() {
        setLoading(true);
        if (isLogin) 
            login({ variables: { email: email.value, password: password.value }});
        else
            registration({ variables: { email: email.value, username: username.value, password: password.value }});
    }

    return (
        <View style={style.login}>
            <View style={style.topLeftCorner}>
                <ImageBackground source={require('assets/topLogin.png')}  style={{ width: '100%', height: 270 }}/>
            </View>
            <Text style={style.header}>{ isLogin ? 'Login' : 'Register' }</Text>
            <View style={style.form}>
                <TextInput
                    {...email}
                    placeholder="Email"
                />
                { !isLogin &&
                    <Fragment>
                        <TextInput
                            {...username}
                            placeholder="Username"
                        />
                        <TextInput
                            {...firstName}
                            placeholder="First name"
                        />
                        <TextInput
                            {...lastName}
                            placeholder="Last name"
                        />
                    </Fragment>
                }
                <TextInput
                    {...password}
                    placeholder="Password"
                />
                
                { !isLogin &&
                    <TextInput
                        {...confirmPassword}
                        placeholder="Confirm password"
                    />
                 }
                 <Button
                    onPress={() => handleSubmitForm()}
                    text={`${isLogin ? 'Login' : 'Sign in'}`}
                    style={style.submitBtn}
                />
                <Button
                    onPress={() => null}
                    text="Connect with facebook"
                    style={style.socialBtn}
                />
            </View>
            <View style={style.bottomRightCorner}>
                <ImageBackground source={require('assets/bottomLogin.png')} style={{ width: '100%', height: 260 }} />
            </View>
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
