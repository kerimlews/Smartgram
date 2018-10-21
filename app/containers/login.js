import React, { Component } from 'react';
import { View, TextInput, ImageBackground,Text } from 'react-native';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Button from 'components/Button';
import style from './styles/login';

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
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
        loading: false,
        error: null
    }

    render() {
        const { username, password, email, confirmPassword, error } = this.state;
        return (
            <Mutation mutation={LOGIN}>
                {(login, { data: dataLogin, error: errorLogin, loading: loginLoading }) => (
            <Mutation mutation={REGISTRATION}>
                {(registration, { data: dataRegist, error: errorRegist, loading: registrerLoading }) => (
            <Mutation mutation={LOGIN}>
                {(connectWithFacebook, { data: dataFb, error, loading }) => (

                    <ImageBackground source={require('../../assets/login.jpg')} style={style.login}>
                        { loading || loginLoading || registrerLoading && <Text>LOADING ...............</Text> }

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

            )}
            </Mutation> 
            )}
            </Mutation> 
            )}
            </Mutation>         
        )
    }
}