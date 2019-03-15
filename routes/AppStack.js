import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation';

import Home from 'containers/Home';
import Forum from 'containers/Forum';
import AddNewPage from 'containers/AddNewPage';
import MyBook from 'containers/MyBook';
import Settings from 'containers/Settings';
import MessageDetails from 'containers/MessageDetails';
import Message from 'containers/Message';

const MateralBottom = createMaterialBottomTabNavigator({
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
});

const MessageStack = createStackNavigator({
    Message: { screen: Message },
    MessageDetails: { screen: MessageDetails }
}, {
    initialRouteName: 'Message', headerMode: 'none'
});

const Navigation = createStackNavigator({
    Feed: {
        screen:MateralBottom, 
        navigationOptions: () => ({
            header: null
        })
    },
    MessageStack: { screen: MessageStack }
  }, {
     initialRouteName: 'Feed', mode: 'card'
  });

  export default Navigation;