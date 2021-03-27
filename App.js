import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { UserProvider } from './src/contexts/User';
import { LocationProvider } from './src/contexts/Location';
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
    <Tab.Screen name="Tracklist" component={TrackList} options={{ title: "Tracks", headerTitleAlign: 'center' }} />
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
            <Tab.Screen
              name="TrackStackScreen"
              component={TrackStackScreen}
              options={{
                title: "Tracks",
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name="list" size={24} color={focused ? 'blue': 'gray'} />
                )
              }}
            />
            <Tab.Screen
              name="TrackCreate"
              component={TrackCreate}
              options={{
                title: "Add Track",
                tabBarIcon: ({ focused }) => (
                  < MaterialIcons name="add-circle" size={24} color={focused ? 'blue': 'gray'} />
                )
              }}
            />
            <Tab.Screen
              name="Account"
              component={Account}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome name="gear" size={24} color={focused ? 'blue': 'gray'} />
                )
              }}
            />
          </Tab.Navigator>
        )
      }

    </NavigationContainer>
  );
}

export default () => (
  <SafeAreaProvider>
    <UserProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </UserProvider>
  </SafeAreaProvider>
);
