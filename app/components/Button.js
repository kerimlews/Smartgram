import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

export default function Button({ onPress, colors, style, styleText, text, icon }) {
    return(
        <TouchableHighlight onPress={onPress}>
            { colors ?
                <LinearGradient colors={colors} style={style} >
                    {icon}
                </LinearGradient>
                :
                <View style={style}>
                    {icon}
                    <Text style={styleText}>
                        {text}
                    </Text>
                </View>
            }
        </TouchableHighlight>
    );
}

const custom = StyleSheet.create({
    text: {
        color: 'white'
    }
})