import React, { useState, Fragment } from 'react';
import { View, TextInput, ImageBackground, Text, Image  } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import { showMessage } from 'react-native-flash-message';
import { Entypo, Feather } from '@expo/vector-icons';
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

    const icon = !isLogin
        ? <Entypo name="check" size={32} color="white" />
        : <Feather name="arrow-right" size={32} color="white" />;

    return (
        <View style={style.login}>
            <View style={style.topLeftCorner}>
                <ImageBackground source={require('assets/topLogin.png')}  style={{ width: '100%', height: 270 }}/>
            </View>
            <Text style={style.header}>Smartgram</Text>
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
                    secureTextEntry
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
                    colors={['#16ccc8', '#25eba3']}
                    icon={icon}
                />
            </View>
            { isLogin && <View style={{ position: 'absolute', height: 100, width: '100%', top: '63%', zIndex: 1000 }}>
                <Button
                    onPress={() => null}
                    styleText={style.forgot}
                    text="Forgot ?"
                />  
                <Button
                    onPress={() => null}
                    style={style.toggleBtn}
                    styleText={style.toggleText}
                    text={`${!isLogin ? 'Login' : 'Register'}`}
                />  
            </View> }
            
            <View style={style.bottomRightCorner}>
                <ImageBackground source={require('assets/bottomLogin.png')} style={{ width: '100%', height: 260 }} />
                <Button
                    onPress={() => null}
                    style={style.socialBtn}
                    icon={<Entypo name="facebook-with-circle" size={52} color="#3B5998" />}
                />
            </View>
        </View>
    )
}

function useFormInput(defaultValue) {
    const [ value, setValue ] = useState(defaultValue);

    return {
        value,
        onChangeText: (e) => setValue(e),
        style: style.textInput
    };
}
