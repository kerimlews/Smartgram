import { AsyncStorage } from 'react-native';

export async function asyncRemoveToken() {
    try {
        await AsyncStorage.removeItem('token')
    } catch(ex) {
        console.log('Error while deleteing token', ex)
    }
}

export async function asyncSetToken(token) {
    try {
        await AsyncStorage.setItem('token', token)
    } catch(ex) {
        console.log('Error while deleteing token', ex)
    }
}