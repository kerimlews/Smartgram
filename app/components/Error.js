import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

export default class Error extends Component {
    static propTypes = {
        
    }

    render() {
        const { errors } = this.props;
        if (!errors)
            return null;
        return(
            <View style={{ backgroundColor: 'red', width: '100%' }}>
                <Text style={{color: '#f7f7f7', opacity: 0.8}}>
                    {errors && errors.graphQLErrors.map((e) => e.message || '')}
                </Text>
            </View>
        );
    }
}