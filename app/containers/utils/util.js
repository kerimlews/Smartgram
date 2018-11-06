import { AsyncStorage } from 'react-native';

export async function signIn(client, requestData) {
    try {
        const data = { ...requestData, isAuth: true }
        console.log(data);
        await client.writeData({ data });
        await AsyncStorage.setItem('token', requestData.token);
    } catch(ex) {
        console.log('Try while saving token try restart app' ,ex)
    }
}

export async function signOut(client) {
    try {
        await AsyncStorage.removeItem('token');
        await client.writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
