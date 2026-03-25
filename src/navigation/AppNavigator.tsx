import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@/containers/home/Index';
import SearchScreen from '@/containers/searchScreen/Index';
import WatchScreen from '@/containers/watchScreen/Index';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Inicio',
            tabBarLabel: 'Inicio',
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Buscar',
            tabBarLabel: 'Buscar',
          }}
        />
        <Tab.Screen
          name="Watch"
          component={WatchScreen}
          options={{
            title: 'Ver',
            tabBarLabel: 'Ver',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
