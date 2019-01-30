import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 250,
        borderBottomRightRadius: 200
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
        backgroundColor: 'red',
        height: 200,
        borderBottomRightRadius: 200
    },
    btnGroup: {
        flexDirection: 'column'
    },
    signBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
