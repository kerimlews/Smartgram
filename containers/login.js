import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { graphql, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';


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
                <View>
                    <TextInput
                        style={{height: 40, width: 200, borderWidth: 1}}
                        onChangeText={(text) => username.value = text}
                        value={username.value}
                        ref={usernameRef => username = usernameRef}
                    />
                    <TextInput
                        style={{height: 40, width: 200, borderWidth: 1}}
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
                </View>
            )
        }
    </Mutation>
)}

export default Login