import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from './styles/stores';

export default class Stores extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={style.stores}>
                <Text>Stores</Text>
            </View>
        );
    }
}