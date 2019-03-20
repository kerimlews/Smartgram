import { createApolloFetch } from 'apollo-fetch';
import { AsyncStorage } from 'react-native';

const uri = 'http://10.45.166.50:4000';

export default createApolloFetch({ uri })
  .use(async ({ request, options }, next) => {
    const token = await AsyncStorage.getItem('token');

    if (!options.headers) {
      options.headers = {};  // Create the headers object if needed.
    }
    options.headers['authorization'] = token;

  next();
});
