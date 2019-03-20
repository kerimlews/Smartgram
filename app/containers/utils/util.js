import { AsyncStorage } from 'react-native';
import fetch from './fetch';

export async function signIn(client, requestData) {
    try {
        console.log(requestData);
        const data = { user: { ...requestData, __typename: 'user' } }
        await client.writeData({ data });
        await AsyncStorage.setItem('token', requestData.token);
    } catch(ex) {
        console.log('Try while saving token try restart app' ,ex)
    }
}

export async function signOut(navigation) {
    try {
        await fetch({ query: `mutation { logout }`});
        await AsyncStorage.removeItem('token');
        navigation.navigate('SignIn');
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
