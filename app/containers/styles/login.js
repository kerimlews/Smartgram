import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: '70%',
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
    btnGroup: {
        flexDirection: 'column'
    },
    signBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
