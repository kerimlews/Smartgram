import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Home from 'containers/home';

export default createMaterialBottomTabNavigator({
    Home: { screen: Home }
}, {
    initialRouteName: "Home"
});