import React from 'react';
import { FlatList, Text } from 'react-native';
import Button from 'components/Button';
import style from 'styles/Button';
import { signOut } from 'containers/utils/util';

const Settings = ({ navigation }) => (
  <FlatList
    data={[{key: 0,text: 'Sign out'}, {key: 1, text: 'b'}]}
    renderItem={({item}) =>
      <Button
        key={item.text}
        text={item.text}
        onPress={() => signOut(navigation)}
        style={style.button}
      />
    }
  />
);

export default Settings;
