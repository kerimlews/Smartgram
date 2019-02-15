import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function MessageItem({ item, handleChangeContent }) {
  return (
    <TouchableOpacity onPress={() => handleChangeContent(item.id)}>
      <View style={{
        borderBottomColor: '#47315a',
        borderBottomWidth: 1,
        width: '100%',
        flex: 1
       }}>
        <Text>{item.name}</Text>
        <Text>{item.message}</Text>
        <Text>{item.isActive ? 'Active' : 'Not acitve'}</Text>
      </View>
    </TouchableOpacity >
  );
}
