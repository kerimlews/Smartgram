import React, { useState } from 'react';
import { View, ImageBackground, Text  } from 'react-native';
import { Mutation  } from 'react-apollo';
import { TextInput } from 'react-native-paper';
import Button from 'components/Button';
import { showMessage } from 'react-native-flash-message';
import SpinnerAnimation from 'animations/Spinner';
import FadeAnimation from 'animations/Fade';
import { Entypo, Feather, EvilIcons } from '@expo/vector-icons';
import style from '../styles/login';
import { signIn } from '../utils/util';
import { LOGIN, REGISTRATION } from '../queries/login';

const onError = ({ message }) => showMessage({
    message,
    type: 'danger'
});

export default function SignIn({ navigation }) {

    const email = useFormInput('kerim@gmail.com');
    const password = useFormInput('kerim1');
    const username = useFormInput('kerimlews');
    const firstName = useFormInput('Kerim');
    const lastName = useFormInput('Alihodza');
    const confirmPassword = useFormInput('');

    const [ isLogin, setLogin ]  = useState(false);
    const [ error, setError ] = useState(null);

    const loginUpdate = (cache, { data: { login } }) => handleSignIn(cache, login)
    const registrationUpdate = (cache, { data: { registration } }) => handleSignIn(cache, registration)

    function handleSignIn(cache, data) {
        signIn(cache, data)
        navigation.navigate('App');
    }

    const variables = {
        email: email.value,
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value
    };

    function icon(loading) {
        if(loading)
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
        <View >
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

            <View>
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
                {
                    isLogin
                    ? (
                        <Mutation mutation={LOGIN} onError={onError} update={loginUpdate}>
                        {(login, { loading }) =>
                            <Button
                                onPress={() => login({ variables })}
                                style={style.submitBtn}
                                colors={['#16ccc8', '#25eba3']}
                                icon={icon(loading)}
                                disabled={loading}
                            />
                        }
                        </Mutation>  
                    ) : (
                        <Mutation mutation={REGISTRATION} onError={onError} update={registrationUpdate}>
                        {(registration, { loading }) =>
                            <Button
                                onPress={() => registration({ variables })}
                                style={style.submitBtn}
                                colors={['#16ccc8', '#25eba3']}
                                icon={icon(loading)}
                                disabled={loading}
                            />
                        }
                        </Mutation>
                    )
                }    
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

            {/* <View style={style.bottomRightCorner}>
                <ImageBackground source={require('assets/bottomLogin.png')} style={{ width: '100%', height: 260 }} />
                <Button
                    onPress={() => null}
                    style={style.socialBtn}
                    icon={<Entypo name="facebook-with-circle" size={52} color="#3B5998" />}
                />
            </View>*/ }
        </View>
    )
}

function useFormInput(defaultValue, customStyle) {
    const [ value, setValue ] = useState(defaultValue);

    return {
        value,
        onChangeText: (e) => setValue(e),
        type: "outlined"
    };
}
