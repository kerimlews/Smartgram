import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import ApolloProvider from 'config/ApolloProvider';

import AppStack from 'routes/AppStack';
import AuthStack from 'routes/AuthStack';
import AuthLoadingScreen from 'routes/AuthLoadingScreen';

const switchStackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const Navigation = createAppContainer(switchStackNavigator);

export default function App() {
  return (
    <ApolloProvider>
      <Navigation />
    </ApolloProvider>
  );
}