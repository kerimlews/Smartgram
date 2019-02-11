import React, { useEffect } from 'react';
import { Animated } from 'react-native';

export default function Fade({ children }) {
    const value = new Animated.Value(0);

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
        <Animated.View style={{ opacity: value }}>
            {children}
        </Animated.View>
    );
}