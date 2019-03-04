import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import style from 'styles/Messages';

export default function MessageItem({ item, openConversation }) {
  return (
    <TouchableOpacity onPress={() => openConversation(item.id)}>
      <View style={style.conversation}>
        <View style={{ position: 'relative', width: 50, height: 50, marginLeft: 20, marginRight: 20 }}>
          <Image
            style={{flex: 1}}
            source={{uri: 'https://www.pngarts.com/files/3/Avatar-Transparent-Image.png'}}
          />
          { item.isActive &&
            <View
              style={{ position: 'absolute', borderRadius: 16, height: 15, width: 15, backgroundColor: 'white', bottom: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}
            >
              <View
                style={{borderRadius: 10, height: 10, width: 10,backgroundColor: '#42f49b'}}
              >
              </View>
            </View>            
          }
        </View>
        <View>
          <Text style={{ color: '#182032', fontWeight: '500', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: '#c5cad4' }}>{item.message}</Text>
        </View>
      </View>
    </TouchableOpacity >
  );
}
