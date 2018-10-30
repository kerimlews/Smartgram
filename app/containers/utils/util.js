import { AsyncStorage } from 'react-native';

export async function asyncRemoveToken() {
    try {
        await AsyncStorage.removeItem('token')
    } catch(ex) {
        console.log('Error while deleteing token', ex)
    }
}

export async function signOut(client) {
    try {
        await AsyncStorage.removeItem('token')
        client.writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
