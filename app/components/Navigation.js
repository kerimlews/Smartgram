import React, { Component } from 'react';
import { View, Text } from 'react-native';
import style from './styles/navigation';

export default class Navigation extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <View style={style.nav}>
                <View style={style.navItem}>
                    <Text>Home</Text>
                </View>
                <View style={style.navItem}>
                    
                </View>
                <View style={style.navItem}>
                    
                </View>
                <View style={style.navItem}>
                    
                </View>
                <View style={style.navItem}>
                    
                </View>
            </View>
        );
    }
}