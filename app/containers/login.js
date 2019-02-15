import React, { useState, Fragment } from 'react';
import { View, TextInput, ImageBackground, Text, Image  } from 'react-native';
import { compose, graphql, withApollo  } from 'react-apollo';
import Button from 'components/Button';
import { showMessage } from 'react-native-flash-message';
import SpinnerAnimation from 'animations/Spinner';
import FadeAnimation from 'animations/Fade';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import style from './styles/login';
import { signIn } from './utils/util';
import SvgUri from 'react-native-svg-uri';
import { LOGIN, REGISTRATION, LOADING } from './queries/login';

const loginUpdate = (cache, { data: { login } }) =>
    signIn(cache, login)
const registrationUpdate = (cache, { data: { registration } }) =>
    signIn(cache, registration)

const onError = ({ message }) => showMessage({
    message,
    type: 'danger'
});

export default compose(
    graphql(LOGIN,
        {
            name: 'login',
            options: {
                update: loginUpdate,
                onError
            }
        }
    ),
    graphql(REGISTRATION,
        {
            name: 'registration',
            options: {
                update: registrationUpdate,
                onError
            }
        }
    )
)(Login);

function Login({ login, registration }) {

    const email = useFormInput('borna@gmail.com');
    const password = useFormInput('kerim1');
    const username = useFormInput('bornaNozic');
    const firstName = useFormInput('Borna', style.customTextInput);
    const lastName = useFormInput('Nozic', { ...style.customTextInput, borderLeftColor: '#e2e2e2', borderLeftWidth: 1 });
    const confirmPassword = useFormInput('');

    const [ isLoading, setLoading ]  = useState(false);
    const [ isLogin, setLogin ]  = useState(false);
    const [ error, setError ] = useState(null);

    const variables = {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value
        }
    };

    async function handleSubmitForm() {
        setLoading(true);

        if (isLogin)
            await login(variables);
        else
            await registration(variables);

        setLoading(false);
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
          {/* <View style={style.topLeftCorner}>

           </View>*/ }

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
                    <View>
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
                    </View>
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
                        disabled={isLoading}
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
