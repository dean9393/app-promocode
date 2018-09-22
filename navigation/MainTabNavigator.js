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
import ReviewScreen from '../screens/ReviewScreen';
import LoginScreen from '../screens/LoginScreen';
import PinScreen from '../screens/PinScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Акции',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      }
    }
  },
  Promo: {
    screen: PromoScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
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
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
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
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
    }
  },
  ReviewList: {
    screen: ReviewScreen,
    navigationOptions: {
      title: 'Отзывы',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Вход',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
    }
  },
  Pin: {
    screen: PinScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
    }
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
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
  Map: {
    screen: MapScreen,
    navigationOptions: {
      title: 'Карта',
      headerStyle: {
        backgroundColor: Colors.navigationTitle,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: 'roboto',
      },
    }
  }
});

MapStack.navigationOptions = {
	tabBarLabel: 'Map',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
      focused={focused}
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
