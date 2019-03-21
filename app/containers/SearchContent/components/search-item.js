import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

function SearchItem({ item, navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { id: item.id })}>
            <View style={{ flex: 1, padding: 10, alignItems: 'center', borderBottomColor: 'gray', borderWidth: 1, flexDirection: 'row', height: 80 }}>
                <Image
                    style={{ width: 50 , height: 50, marginRight: 15}}
                    source={{uri: 'https://www.pngarts.com/files/3/Avatar-Transparent-Image.png'}}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text>{item.firstName} </Text>
                    <Text>{item.lastName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default withNavigation(SearchItem);