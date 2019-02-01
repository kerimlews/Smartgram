import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    linear: {  
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    header: {
        alignSelf: 'center',
        color: '#3d5169',
        fontSize: 24,
        lineWidth: 600
    },
    textInput: {
        width: '70%',
        fontFamily: 'ubuntu',
        margin: 5,
        padding: 5,
        borderBottomColor: 'white',
        fontFamily: 'ubuntu',
        fontSize: 16
    },
    loginBtn: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#f7f7f7',
        margin: 4
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    shadowOffset: {
      width: 0,
      height: 3
    },
    btnGroup: {
        flexDirection: 'column'
    },
    signBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
