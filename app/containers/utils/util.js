import { AsyncStorage } from 'react-native';

export async function signIn(client, requestData) {
    try {
        console.log(client == null);
        const data = { ...requestData, isAuth: true }
        await AsyncStorage.setItem('token', requestData.token);
        await client.writeData({ data });
    } catch(ex) {
        console.log('Try while saving token try restart app' ,ex)
    }
}

export async function signOut(client) {
    try {
        //console.log(client)
        await AsyncStorage.removeItem('token');
        await client.writeData({ data: { isAuth: false } });
    } catch(ex) {
        console.log('Error sign out ', ex);
    }
}
