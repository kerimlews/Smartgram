import React from 'react';
import { View, Text } from 'react-native';

export default function ConversationItem({ item }) {
  return (
    <View>
      <Text>{item.message}</Text>
      <Text>{item.createdAt}</Text>
      <Text>{item.isSeen && 'Seen'}</Text>
    </View>
  );
}
