import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Button extends Component {
    static propTypes = {
        
    }
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress}>
                <View style={this.props.style}>
                    <Text style={{color: '#f7f7f7', opacity: 0.8}}>
                        {this.props.text.toUpperCase()}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}