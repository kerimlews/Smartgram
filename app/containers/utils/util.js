import { AsyncStorage } from 'react-native';

export async function saveToken (cache, requestData) {
    try {
        console.log(cache == null);
        const data = { ...requestData, isAuth: true }
        await AsyncStorage.setItem('token', requestData.token);
        await cache.writeData({ data });
    } catch(ex) {
        console.log('Try while saving token try restart app' ,ex)
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
