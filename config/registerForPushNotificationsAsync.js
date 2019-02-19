import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import fetch from 'containers/utils/fetch';

export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  await AsyncStorage.setItem('expoToken', token);

  console.log('expo', token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch({
    query: `mutation saveExpoToken($token: String!) {
      saveExpoToken(token: $token)`,
    variables: { token }
  }).then(res => {
    console.log(res.data);
  });
}
