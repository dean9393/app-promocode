import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PromoScreen from '../screens/PromoScreen';
import InfoScreen from '../screens/InfoScreen';
import InfoMapScreen from '../screens/InfoMapScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Акции',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
    }
  },
  Promo: {
    screen: PromoScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  InfoMap: {
    screen: InfoMapScreen,
    navigationOptions: {
      title: 'Карта',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
    }
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: () => (
    <TabBarIcon
      name={ Platform.OS === 'ios'  ? 'ios-pricetags' : 'tags' }
	    font={ Platform.OS === 'ios' ? 'Ionicons' : 'FontAwesome' }
    />
  ),
  tabBarOptions: {
	  showLabel: false,
  },
};

const MapStack = createStackNavigator({
	Map: MapScreen,
});

MapStack.navigationOptions = {
	tabBarLabel: 'Map',
	tabBarIcon: () => (
		<TabBarIcon
		  name={Platform.OS === 'ios' ? `ios-map` : 'map-o'}
		  font={Platform.OS === 'ios'	? 'Ionicons' : 'FontAwesome'}
		/>
	),
	tabBarOptions: {
	  showLabel: false,
	}
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
  tabBarOptions: {
	showLabel: false,
  }
};

export default createBottomTabNavigator({
  HomeStack,
  MapStack,
  SettingsStack,
});
