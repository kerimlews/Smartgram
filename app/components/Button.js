import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo';

export default function Button({ onPress, colors, style, styleText, text, icon, disabled }) {
    return(
            <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
                { colors ?
                    <LinearGradient colors={colors} style={style}>
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
            </TouchableWithoutFeedback>
    );
}

const custom = StyleSheet.create({
    text: {
        color: 'white'
    }
})
