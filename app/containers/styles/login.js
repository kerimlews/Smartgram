import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fdfdfe'
    },
    linear: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    header: {
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        color: '#3d5169',
        fontSize: 30,
        fontWeight: '600',
    },
    forgot: {
        color: '#cbd4de',
        alignSelf: 'flex-end',
        fontSize: 18,
        marginRight: 40,
        marginTop: 20,
        fontWeight: '600'
    },
    form : {
        backgroundColor: 'white',
        width: '85%',
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        elevation: 4,
        height: 'auto',
        position: 'relative',
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 1,
        marginTop: 40
    },
    registBtn: {
        height: 50,
        elevation: 1,
        width: 140,
        marginTop: 20,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10,
        zIndex: 1000
    },
    loginBtn: {
        height: 50,
        elevation: 1,
        width: 100,
        marginTop: 20,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: 'center',
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10
    },
    toggleText: {
        color: '#f8785d',
        fontWeight: '500',
        fontSize: 20,
        marginLeft: 20
    },
    bottomSection: {
        alignItems: 'flex-end',
        width: '100%',
        zIndex: 1000
    },
    submitBtn: {
        width: 60,
        height: 60,
        borderRadius: 60,
        elevation: 5,
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000000
    },
    bottomRightCorner: {
        position: 'relative'
    },
    socialBtn: {
        right: 8,
        height: 60,
        width: 60,
        borderRadius: 60,
        elevation: 5,
        shadowColor: '#3B5998',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'white',
        fontSize: 26,
        bottom: 16,
        zIndex: 100,
        flexDirection: 'row-reverse'
    },
    textInput: {
        width: '80%',
        fontFamily: 'ubuntu',
        padding: 20,
        borderBottomColor: '#f8fafb',
        borderBottomWidth: 1,
        margin: 0,
        fontSize: 16,
        color: '#8093ad'
    },
    customTextInput: {
        flex: 1,
        fontFamily: 'ubuntu',
        padding: 20,
        borderBottomColor: '#f8fafb',
        borderBottomWidth: 1,
        margin: 0,
        fontSize: 16,
        color: '#8093ad'
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fca9b2',
        height: 300,
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100
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

const toggleBtn = {

}
