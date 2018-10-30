import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import Error from 'components/Error';
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

export default class Login extends Component {
    state = {
        email: 'kerim1@gmail.com',
        password: 'kerim1',
        username: '',
        confirmPassword: '',
        loading: false,
        error: null
    }


    login = (cache, { data: { login } }) => signIn(cache, login);
    registration = (cache, { data: { registration } }) => signIn(cache, registration);

    render() {
        const { username, password, email, confirmPassword, error } = this.state;
        return (
            <Mutation mutation={LOGIN} update={this.login}>
                {(login, { error: errorLogin, loading: loginLoading }) => (
            <Mutation mutation={REGISTRATION} update={this.registration}>
                {(registration, { error: errorRegist, loading: registrerLoading }) => (
            <Mutation mutation={LOGIN}>
                {(connectWithFacebook, { error: errorFb, loading: loadingFb }) => {

                    if (loadingFb || loginLoading || registrerLoading)
                        return <Text>LOADING ...............</Text>
                    return (

                    <ImageBackground source={require('../../assets/login.jpg')} style={style.login}>
                        <Error
                            errors={errorLogin || errorRegist || errorFb || error}
                        />
                        <TextInput
                            style={style.textInput}
                            onChangeText={(email) => this.setState({ email })}
                            value={email}
                            placeholder="Email"
                            underlineColorAndroid="white"
                        />
                        <TextInput
                            style={style.textInput}
                            onChangeText={(username) => this.setState({ username })}
                            value={username}
                            placeholder="Username"
                            underlineColorAndroid="white"
                        />
                        <TextInput
                            style={style.textInput}
                            onChangeText={(password) => this.setState({ password })}
                            value={password}
                            placeholder="Password"
                        />
                        <View style={style.btnGroup} >
                            <View style={style.signBtn} >
                                <Button
                                    onPress={() => login({ variables: { email, password }})}
                                    text="Login"
                                    style={style.loginBtn}
                                />
                                <Button
                                    onPress={() => registration({ variables: { email, username, password }})}
                                    text="Sign in"
                                    style={style.loginBtn}
                                />
                            </View>
                            <Button
                                onPress={() => connectWithFacebook({ variables: { username, password }})}
                                text="Connect with facebook"
                                style={style.loginBtn}
                            />
                        </View>
                    </ImageBackground>

            )}}
            </Mutation>
            )}
            </Mutation>
            )}
            </Mutation>
        )
    }
}
