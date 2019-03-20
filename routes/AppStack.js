import React from 'react';
import { Easing } from 'expo';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';

import Home from 'containers/Home';
import Forum from 'containers/Forum';
import AddNewPage from 'containers/AddNewPage';
import MyBook from 'containers/MyBook';
import Settings from 'containers/Settings';
import MessageDetails from 'containers/MessageDetails';
import Message from 'containers/Message';
import SearchContent from 'containers/SearchContent';

import MainHeader from 'headers/MainHeader';
import SearchHeader from 'headers/SearchHeader';

const MainScreen = createMaterialBottomTabNavigator({
    Home: { screen: Home },
    Forum: { screen: Forum },
    AddNewPage: { screen: AddNewPage },
    MyBook: { screen: MyBook },
    Settings: { screen: Settings }
}, {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
    shifting: true
});

const Navigation = createStackNavigator({
    Main: {
        screen: MainScreen, 
        navigationOptions: () => ({
            header: <MainHeader />
        })
    },
    Search: {
        screen: SearchContent, 
        navigationOptions: () => ({
            header: <SearchHeader />
        })
    },
    Message: { screen: Message },
    MessageDetails: { screen: MessageDetails }
  },{
    initialRouteName: 'Main',
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            useNativeDriver: true,
        }
    })
    
});

  export default Navigation;