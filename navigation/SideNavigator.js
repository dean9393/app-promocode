import React from 'react';
import { 
    Dimensions,
	TouchableOpacity,
	Image
} from 'react-native'; 
import { 
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import SideMenu from '../components/SideMenu';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SubHomeScreen from '../screens/SubHomeScreen';
import CatReviewScreen from '../screens/CatReviewScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PromoScreen from '../screens/PromoScreen';
import InfoScreen from '../screens/InfoScreen';
import InfoMapScreen from '../screens/InfoMapScreen';
import ReviewScreen from '../screens/ReviewScreen';
import LoginScreen from '../screens/LoginScreen';
import PinScreen from '../screens/PinScreen';
import CreateReviewScreen from '../screens/CreateReviewScreen';
import RewardScreen from '../screens/RewardScreen';
import SupportScreen from '../screens/SupportScreen';
import RewardSupportScreen from '../screens/RewardSupportScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsGeneralScreen from '../screens/SettingsGeneralScreen';
import SettingsCityScreen from '../screens/SettingsCityScreen';
import SettingsPhoneScreen from '../screens/SettingsPhoneScreen';
import SettingsNotificationScreen from '../screens/SettingsNotificationScreen';
import SearchScreen from '../screens/SearchScreen';

const sideNavigator = createStackNavigator({
    Home:{
        screen: HomeScreen,
        navigationOptions:({navigation}) =>({
            headerLeft:(
                <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 15 }} activeOpacity={1} onPress={() => navigation.openDrawer()}>
                    <Ionicons name="ios-menu" size={30} color={'#fff'} />
                </TouchableOpacity>
			),
			headerRight:(
				<TouchableOpacity style={{ paddingRight: 15, paddingLeft: 10 }} activeOpacity={1} onPress={() => navigation.navigate('Search')}>
                    <Image source={require('../assets/images/ic_search_white.png')} style={{width:23, height:23}} />
                </TouchableOpacity>
			),
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	SubHome:{
		screen: SubHomeScreen,
		navigationOptions:({navigation}) =>({
			headerRight:(
				<TouchableOpacity style={{ paddingRight: 15, paddingLeft: 10 }} activeOpacity={1} onPress={() => navigation.openDrawer()}>
                    <Image source={require('../assets/images/ic_search_white.png')} style={{width:23, height:23}} />
                </TouchableOpacity>
			),
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
    Promo: {
    	screen: PromoScreen,
    	navigationOptions: ({navigation}) => ({
			title: 'Описание акции',
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
      		tabBarOptions: {
        		showLabel: false,
      		},
    	})
	},
	Info: {
    	screen: InfoScreen,
    	navigationOptions: ({navigation}) => ({
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
			},
			title: 'Описание',
      		headerTintColor: '#fff',
      		headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
      		tabBarOptions: {
        		showLabel: false,
      		},
    	})
	},
	InfoMap: {
    	screen: InfoMapScreen,
    	navigationOptions: ({navigation}) => ({
      		title: 'На карте',
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
        		fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
    	})
	},
	Map: {
		screen: MapScreen,
		navigationOptions: ({navigation}) => ({
			headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
		   	},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
		})
	},
	CatReview: {
		screen: CatReviewScreen,
		navigationOptions: ({navigation}) => ({
			headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
		   	},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
		})
	},
    ReviewList: {
    	screen: ReviewScreen,
    	navigationOptions: ({navigation}) => ({
      		title: 'Отзывы',
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
    	})
  	},
  	Login: {
    	screen: LoginScreen,
    	navigationOptions: ({navigation}) => ({
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
			headerTintColor: '#fff',
			tabBarVisible: false,
			headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
    	})
  	},
  	Pin: {
    	screen: PinScreen,
    	navigationOptions: ({navigation}) => ({
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
			headerTintColor: '#fff',
			tabBarVisible: false,
      		headerTitleStyle: {
        		fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
    	})
	},
	Reward: {
		screen: RewardScreen,
		headerMode: 'none',
		navigationOptions: ({navigation}) => ({
			headerVisible: false,
			title: '',
			headerStyle: {
			  	backgroundColor: Colors.navigationTitle,
			  	shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
			},
			tabBarVisible: false,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
	  	})
	},
	RewardSupport: {
		screen: RewardSupportScreen,
		headerMode: 'none',
		navigationOptions: ({navigation}) => ({
			headerVisible: false,
			title: '',
			headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
			},
			tabBarVisible: false,
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontFamily: 'roboto-medium',
				fontSize: 20,
			},
	  	})
	},
  	CreateReview: {
    	screen: CreateReviewScreen,
    	navigationOptions: ({navigation}) => ({
      		title: 'Оставить отзыв',
      		headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
        		fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
    	})
	},
	Support: {
		screen: SupportScreen,
		navigationOptions: ({navigation}) =>({
			title: 'Поддержка клиентов',
			headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
        		fontFamily: 'roboto-medium',
				fontSize: 20,
      		},
		})
	},
	About:{
        screen: AboutScreen,
        navigationOptions:({navigation}) =>({
            title: 'О проекте',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	Settings:{
        screen: SettingsScreen,
        navigationOptions:({navigation}) =>({
            title: 'Настройки',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	SettingsGeneral:{
        screen: SettingsGeneralScreen,
        navigationOptions:({navigation}) =>({
            title: 'Общие настройки',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	SettingsCity:{
        screen: SettingsCityScreen,
        navigationOptions:({navigation}) =>({
            title: 'Ваш город',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	SettingsPhone: {
		screen: SettingsPhoneScreen,
		navigationOptions:({navigation}) =>({
            title: 'Мобильный телефон',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	SettingsNotification: {
		screen: SettingsNotificationScreen,
		navigationOptions:({navigation}) =>({
            title: 'Мобильный телефон',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	},
	Search: {
		screen: SearchScreen,
		navigationOptions:({navigation}) =>({
            title: 'Поиск',
            headerStyle: {
				backgroundColor: Colors.navigationTitle,
				shadowOpacity: 0,
				shadowOffset: {
					height: 0
				},
				shadowRadius: 0,
				elevation: 0
      		},
      		headerTintColor: '#fff',
      		headerTitleStyle: {
                fontFamily: 'roboto-medium',
                fontSize: 20
			},
        })
	}
});

export default createDrawerNavigator({
    Item1: {
        screen: sideNavigator,
      }
    }, {
      contentComponent: SideMenu,
      drawerWidth: Dimensions.get('window').width - 60,  
  });