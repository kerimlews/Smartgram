import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import Home from 'containers/Home';
import Forum from 'containers/Forum';
import AddNewPage from 'containers/AddNewPage';
import MyBook from 'containers/MyBook';
import Settings from 'containers/Settings';

export default createMaterialBottomTabNavigator({
    Home: { screen: Home },
    Forum: { screen: Forum },
    AddNewPage: { screen: AddNewPage },
    MyBook: { screen: MyBook },
    Settings: { screen: Settings }
}, {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' }
});

