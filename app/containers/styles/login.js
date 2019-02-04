import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    login: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fdfdfe',
        position: 'relative'
    },
    linear: {  
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    header: {
        position: 'absolute',
        top: '25%',
        alignSelf: 'center',
        fontFamily: 'sans-serif',
        color: '#3d5169',
        fontSize: 30,
        fontWeight: '600'
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
        elevation: 5,
        height: 'auto',
        position: 'relative',
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10
    },
    toggleBtn: {
        height: 50,
        elevation: 1,
        width: 140,
        marginTop: 20,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        position: 'absolute',
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
    submitBtn: {
        width: 70,
        height: 70,
        borderRadius: 70,
        position: 'absolute',
        right: -25,
        elevation: 5,
        shadowColor: '#d1d8e1',
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 30
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
