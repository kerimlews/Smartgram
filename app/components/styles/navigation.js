import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    nav: {
      backgroundColor: '#3f9384',
      flexDirection: 'row',
      height: 50
    },

    navItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },

    active: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    }
})
