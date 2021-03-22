import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserProvider } from './src/contexts/User';
import UserContext from './src/contexts/User';

import Signin from './src/screens/Signin'
import Signup from './src/screens/Signup'
import TrackList from './src/screens/TrackList';
import TrackDetail from './src/screens/TrackDetail';
import TrackCreate from './src/screens/TrackCreate';
import Account from './src/screens/Account';

const AuthStack = createStackNavigator();

const TrackStack = createStackNavigator();
const TrackStackScreen = () => (
  <TrackStack.Navigator>
    <Tab.Screen name="Tracklist" component={TrackList} />
    <Tab.Screen name="TrackDetail" component={TrackDetail} />
  </TrackStack.Navigator>
)

const Tab = createBottomTabNavigator();

function App() {
  const { state } = useContext(UserContext)
  const { userToken } = state

  return (
    <NavigationContainer>
      {
        !userToken ? (
          <AuthStack.Navigator>
            <AuthStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
            <AuthStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          </AuthStack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="TrackStackScreen" component={TrackStackScreen} />
            <Tab.Screen name="TrackCreate" component={TrackCreate} />
            <Tab.Screen name="Account" component={Account} />
          </Tab.Navigator>
        )
      }

    </NavigationContainer>
  );
}

export default () => (<UserProvider>
  <App />
</UserProvider>);
