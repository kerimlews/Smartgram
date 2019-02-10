import React, { useEffect } from 'react';
import { Animated } from 'react-native';

export default function Fade({ children }) {
  
    const fadeAnim= new Animated.Value(0), 

    useEffect(() => {
        Animated.timing(                  // Animate over time
            fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 10000,              // Make it take a while
            }).start()  
        }                      // Starts the animation
    ); 

    return (
      <Animated.View                 // Special animatable View
        style={{
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {children}
      </Animated.View>
    );
}