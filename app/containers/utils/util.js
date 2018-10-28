import { AsyncStorage } from 'react-native';

export async function asyncRemoveToken() {
    try {
        await AsyncStorage.removeItem('token')
    } catch(ex) {
        console.log('Error while deleteing token', ex)
    }
}

async function signOut(writeData) {
    try {
        await AsyncStorage.removeItem('token')
        writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
