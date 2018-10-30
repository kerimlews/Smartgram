import { AsyncStorage } from 'react-native';

export async function signOut(client) {
    try {
        await AsyncStorage.removeItem('token')
        client.writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}

export async function signIn(client, data) {
    try {
        await AsyncStorage.setItem('token', data.token);
        await client.writeData({ data: { ...data, isAuth: true } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
