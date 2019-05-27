import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
	TouchableOpacity,
	SafeAreaView
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

class SettingsScreen extends React.Component {

	constructor(props)
	{
		super(props)
	}

	render() {
		return(
			<SafeAreaView style={styles.areaContainer}>
				<View style={styles.container}>
					<ScrollView>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() => this.props.navigation.navigate('SettingsGeneral')}>
							{(this.props.store.user && this.props.store.user.avatar != null) &&
                                <Avatar
                                rounded
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                source={{ uri:'http://promocodehealth.ru/public/storage/' + this.props.store.user.avatar }}
								activeOpacity={ 0.7 }
								width={64}
								height={64} />
                            }
                            {(this.props.store.user && this.props.store.user.avatar == null && (this.props.store.user.first_name != null || this.props.store.user.second_name != null)) &&
                                <Avatar
                                rounded
                                overlayContainerStyle={{backgroundColor: Colors.navigationTitle}}
                                title={(this.props.store.user.first_name != null)? this.props.store.user.first_name.substr(0,1): '' + (this.props.store.user.second_name != null)? this.props.store.user.second_name.substr(0,1): ''}
                                activeOpacity={ 0.7 } 
								width={64}
								height={64} />
                            }
                            {((this.props.store.user && this.props.store.user.avatar == null && this.props.store.user.first_name == null && this.props.store.user.second_name == null) || this.props.store.user == null) &&
                                <Avatar
                                rounded
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                source={ require('../assets/images/user_icon_stock1.png') }
                                activeOpacity={ 0.7 } 
								width={64}
								height={64} />
							}
							<View style={styles.grow}>
								<Text style={styles.title}>{
									(this.props.store.user.first_name != null && this.props.store.user.first_name.length > 0 && this.props.store.user.second_name == null) ? this.props.store.user.first_name :
									(this.props.store.user.first_name == null && this.props.store.user.second_name != null && this.props.store.user.second_name.length > 0) ? this.props.store.user.second_name : 
									(this.props.store.user.first_name != null && this.props.store.user.second_name != null && this.props.store.user.first_name.length > 0 && this.props.store.user.second_name.length > 0) ? this.props.store.user.first_name + ' ' + this.props.store.user.second_name : 

									((this.props.store.user.first_name == null && this.props.store.user.second_name == null) || (this.props.store.user.first_name.length <= 0 && this.props.store.user.second_name.length <= 0)) ? 'Пользователь' : ''
								}</Text>
								<Text style={styles.subtitle}>{(this.props.store.user.birthday) ? this.dateFormat(this.props.store.user.birthday) : ''}</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						{/*(this.props.store.user.role_id && this.props.store.user.company) &&*/}
						<TouchableOpacity activeOpacity={1} style={styles.block}>
							<Avatar
							rounded
							overlayContainerStyle={{backgroundColor: Colors.navigationTitle}}
							title='ДП'
							activeOpacity={ 0.7 }
							width={64}
							height={64} />
							<View style={styles.grow}>
								<Text style={styles.title}>Дента Плюс</Text>
								<Text style={styles.subtitle}>Стоматология</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() =>  this.props.navigation.navigate('SettingsCity')}>
							<Avatar
							overlayContainerStyle={{backgroundColor: 'white'}}
							source={require('../assets/images/settings_locations.png')}
							activeOpacity={ 0.7 } 
							width={40}
							height={40} />
							<View style={styles.grow}>
								<Text style={styles.title2}>Город по умолчанию</Text>
								<Text style={styles.subtitle2}>{(this.props.store.cityTitle)? this.props.store.cityTitle : ''}</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() =>  this.props.navigation.navigate('SettingsPhone')}>
							<Avatar
							overlayContainerStyle={{backgroundColor: 'white'}}
							source={require('../assets/images/settings_phone.png')}
							activeOpacity={ 0.7 } 
							width={40}
							height={40} />
							<View style={styles.grow}>
								<Text style={styles.title2}>Номер телефона</Text>
								<Text style={styles.subtitle2}>{(this.props.store.user.phone)? this.props.store.user.phone: ''}</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() =>  this.props.navigation.navigate('SettingsNotification')}>
							<Avatar
							overlayContainerStyle={{backgroundColor: 'white'}}
							source={require('../assets/images/settings_bell.png')}
							activeOpacity={ 0.7 } 
							width={40}
							height={40} />
							<View style={styles.grow}>
								<Text style={styles.title2}>Уведомления</Text>
								<Text style={styles.subtitle2}>Получать уведомления</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() => {this.props.onAddBack('Settings'), this.props.navigation.navigate('Support')}}>
							<Avatar
							overlayContainerStyle={{backgroundColor: 'white'}}
							source={require('../assets/images/settings_questions.png')}
							activeOpacity={ 0.7 } 
							width={40}
							height={40} />
							<View style={styles.grow}>
								<Text style={styles.title2}>Поддержка</Text>
								<Text style={styles.subtitle2}>Нужна помощь?</Text>
							</View>
							<Image source={require('../assets/images/arrow.png')} style={styles.arrow} />
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} style={styles.block} onPress={() => {this.props.onAddUser(null), this.props.navigation.navigate('Home')}}>
							<Avatar
							overlayContainerStyle={{backgroundColor: 'white'}}
							source={require('../assets/images/settings_exit.png')}
							activeOpacity={ 0.7 } 
							width={20}
							containerStyle={{margin: 10}}
							height={20} />
							<View style={styles.grow}>
								<Text style={[styles.title2, styles.red]}>Выход из аккаунта</Text>
								<Text style={[styles.subtitle2, styles.red]}>Не покидайте нас</Text>
							</View>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}

	dateFormat = (date) => { 
		var dat = new Date(date.replace(/\./g,"/"));
		return ((dat.getDate()<10) ? "0"+dat.getDate() : dat.getDate())+"."+(((dat.getMonth()+1)<10) ? "0"+(dat.getMonth()+1) : (dat.getMonth()+1))+"."+dat.getFullYear();
	}
}
export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
		onAddBack: (back) => {
			dispatch({type: 'setBack', value: back})
		},
		onAddUser: (user) => {
			dispatch({type: 'setUser', value: user})
        }
    })
)(SettingsScreen);

const styles = StyleSheet.create({
	areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
	},
	title: {
		fontSize: 14,
	},
	title2: {
		fontSize: 16,
	},
	subtitle: {
		fontSize: 12,
		opacity: 0.54,
	},
	subtitle2: {
		fontSize: 14,
		opacity: 0.54,
	},
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 12,
		paddingHorizontal: 15,
	},
	grow: {
		flexGrow: 2,
		alignSelf: 'center',
		paddingHorizontal: 15,
	},
	arrow: {
		width: 7.4,
		height: 12,
		alignSelf: 'center',
	},
	red: {
		color: '#6A0101'
	}
})