import React, { useEffect } from 'react';
import { Animated } from 'react-native';

export default function Spinner({ children }) {
    const value = new Animated.Value(0);
    const spin = value.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });
    
    useEffect(() => {
        Animated.timing(
            value,
          {
            toValue: 1,
            duration: 1000
          }
        ).start()
    });


    return (
        <Animated.View style={{transform: [{rotate: spin}] }}>
            {children}
        </Animated.View>
    );
}