import React, { useState, Fragment } from 'react';
import { View, TextInput, ImageBackground, Text, Image  } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'components/Button';
import { showMessage } from 'react-native-flash-message';
import SpinnerAnimation from 'animations/Spinner';
import FadeAnimation from 'animations/Fade';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import style from './styles/login';
import { signIn } from './utils/util';
import SvgUri from 'react-native-svg-uri';

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
const LOADING = gql`
    {
        user @client {
            isLoading  
        }
    }
`;

const loginUpdate = (cache, { data: { login } }) =>
    signIn(cache, login)
const registrationUpdate = (cache, { data: { registration } }) =>
    signIn(cache, registration)

export default compose(
    graphql(LOGIN,
        {
            name: 'login',
            options: {
                update: loginUpdate,
                onError: ({ message }) => showMessage({
                    message,
                    type: 'danger'
                })
            }
        }
    ), 
    graphql(REGISTRATION,
        {
            name: 'registration',
            options: {
                update: registrationUpdate,
                onError: ({ message }) => showMessage({
                    message,
                    type: 'danger'
                })
            }
        }
    ),
    graphql(LOADING, {
        props: ({ data: { isLoading } }) => isLoading
    })
)(Login);


function Login({ login, registration, isLoading }) {
    console.log(isLoading)

    const email = useFormInput('kerim1@gmail.com');
    const password = useFormInput('kerim1');
    const username = useFormInput('kerimlews');
    const firstName = useFormInput('Kerim', style.customTextInput);
    const lastName = useFormInput('Alihodza', { ...style.customTextInput, borderLeftColor: '#e2e2e2', borderLeftWidth: 1 });
    const confirmPassword = useFormInput('');

    const [ isLogin, setLogin ]  = useState(false);
    const [ error, setError ] = useState(null);

    const variables = {
        variables: {
            email: email.value,
            username: username.value,
            password: password.value
        }
    };

    function handleSubmitForm() {
        if (isLogin) 
            login(variables);
        else
            registration(variables);
    }

    function icon() { 
        if(isLoading)
            return (
                <SpinnerAnimation>
                    <EvilIcons name="spinner-3" size={32} color="white" />
                </SpinnerAnimation>
            );
        else if(isLogin)
            return <Entypo name="check" size={32} color="white" />
        else
            return <Feather name="arrow-right" size={32} color="white" />;
    }

    return (
        <View style={style.login}>
            <View style={style.topLeftCorner}>
           {<SvgUri source={require('assets/topLogin.svg')} />   }         </View>
    
            { !isLogin && <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    onPress={() => setLogin(!isLogin)}
                    style={style.loginBtn}
                    styleText={style.toggleText}
                    text="Login"
                />
            </View> }

            <Text style={style.header}>Smartgram</Text>
    
            <View style={style.form}>
                <TextInput
                    {...email}
                    placeholder="Email"
                />
                { !isLogin &&
                    <FadeAnimation>
                        <TextInput
                                {...username}
                                placeholder="Username"
                            />
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                {...firstName}
                                placeholder="First name"
                            />
                            <TextInput
                                {...lastName}
                                placeholder="Last name"
                            />
                        </View>
                    </FadeAnimation>
                }
                <TextInput
                    {...password}
                    placeholder="Password"
                    secureTextEntry
                />
                
                { !isLogin &&
                    <FadeAnimation>
                        <TextInput
                            {...confirmPassword}
                            placeholder="Confirm password"
                        />
                    </FadeAnimation>
                }
                <View style={{ marginTop: isLogin ? '12%' : '45%', position: 'absolute', right: -25 }}>
                    <Button
                        onPress={() => handleSubmitForm()}
                        style={style.submitBtn}
                        colors={['#16ccc8', '#25eba3']}
                        icon={icon()}
                    />
                </View>
            </View>

            { isLogin && <View style={style.bottomSection}>
                <Button
                    onPress={() => setLogin(!isLogin)}
                    styleText={style.forgot}
                    text="Forgot ?"
                />  
            </View> }
            
            { isLogin && <View>
                <Button
                    onPress={() => setLogin(!isLogin)}
                    style={style.registBtn}
                    styleText={style.toggleText}
                    text="Register"
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

function useFormInput(defaultValue, customStyle) {
    const [ value, setValue ] = useState(defaultValue);

    return {
        value,
        onChangeText: (e) => setValue(e),
        style: customStyle || style.textInput
    };
}
