import React from 'react';
import { FlatList, Text } from 'react-native';
import { ApolloConsumer } from 'react-apollo';
import Button from 'components/Button';
import style from 'styles/Button';
import { signOut } from 'containers/utils/util';

const Settings = ({ navigation }) => (
  <ApolloConsumer>
  { client => (
    <FlatList
      data={[{key: 0,text: 'Sign out'}, {key: 1, text: 'b'}]}
      renderItem={({item}) =>
        <Button
          key={item.text}
          text={item.text}
          onPress={async () => {
            await signOut(client);
            navigation.navigate('Auth');
          }}
          style={style.button}
        />
      }
    />
  )}
  </ApolloConsumer>
);

export default Settings;
