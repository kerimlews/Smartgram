import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';
import { AntDesign, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

import Home from 'containers/Home';
import Forum from 'containers/Forum';
import AddNewPage from 'containers/AddNewPage';
import Notices from 'containers/Notices';
import Settings from 'containers/Settings';
import MessageDetails from 'containers/MessageDetails';
import Message from 'containers/Message';
import SearchContent from 'containers/SearchContent';
import Profile from 'containers/Profile';

import MainHeader from 'headers/MainHeader';

const MainScreen = createMaterialBottomTabNavigator({
    Home: { screen: Home, navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: <AntDesign name="home" size={25} style={{ color: 'gray' }} />,
        gesturesEnabled: true,
        swipeEnabled: true
    }},
    Forum: { screen: Forum , navigationOptions: {
        tabBarLabel: 'Forum',
        tabBarIcon: <FontAwesome name="forumbee" size={25} style={{ color: 'gray' }} />,
        gesturesEnabled: true,
    }},
    AddNewPage: { screen: AddNewPage, navigationOptions: {
        tabBarLabel: 'Forum',
        tabBarIcon: <MaterialIcons name="playlist-add" size={25} style={{ color: 'gray' }} />,
        gesturesEnabled: true,
    }},
    Notices: { screen: Notices, navigationOptions: {
        tabBarLabel: 'Forum',
        tabBarIcon: <Ionicons name="ios-notifications-outline" size={25} style={{ color: 'gray' }} />,
        gesturesEnabled: true,
    }},
    Settings: { screen: Settings, navigationOptions: {
        tabBarLabel: 'Forum',
        tabBarIcon: <AntDesign name="setting" size={25} style={{ color: 'gray' }} />,
        gesturesEnabled: true,
    }}
}, {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    barStyle: { backgroundColor: 'white',  },
    shifting: true,
    activeTintColor: 'gray',
    labeled: false

});

const Navigation = createStackNavigator({
    Main: { screen: MainScreen, navigationOptions: () => ({
            header: <MainHeader />
        })
    },
    Search: { screen: SearchContent, navigationOptions: () => ({
            header: null
        })
    },
    Message: { screen: Message },
    MessageDetails: { screen: MessageDetails },
    Profile: { screen: Profile }
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