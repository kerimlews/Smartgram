import React, { useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function SpinnerIcon({ size, color }) {
    var value = new Animated.Value(0);

    useEffect(() => {
        spin();
    });

    function spin() {
        value.setValue(new Animated.Value(0));
        Animated.timing(value, {
            toValue: 1,
            duration: 4000,
            easing: Easing.linear
        }).start(() => spin())
    }

    console.log(value)
    const spinner = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <Animated.View style={{ transform: [{rotate: spinner}] }}>
            <EvilIcons name="spinner-3" size={size} color={color} />
        </Animated.View>
    );
};

