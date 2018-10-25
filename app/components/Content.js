import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from './styles/content';

export default class Content extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={style.content}>
                <Text>Content</Text>
            </View>
        );
    }
}