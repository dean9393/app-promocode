import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import {NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';

class SideMenu extends React.Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props)
    {
        super(props)
    }

    pressButton = () => {
        if(!this.props.store.user){
            this.props.onAddBack('Home')
		    this.props.navigation.navigate('Login')
        }
	}

    render(){
        return(
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity activeOpacity={1}  style={[styles.topBlock, styles.horizontal]} onPress={() => { this.pressButton() }}>
                        <View style={ styles.avatarContainer }>
                            {(this.props.store.user && this.props.store.user.avatar != null) &&
                                <Avatar
                                medium
                                rounded
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                source={{ uri:'http://promocodehealth.ru/public/storage/' + this.props.store.user.avatar }}
                                activeOpacity={ 0.7 } />
                            }
                            {(this.props.store.user && this.props.store.user.avatar == null && (this.props.store.user.first_name != null || this.props.store.user.second_name != null)) &&
                                <Avatar
                                medium
                                rounded
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                title={(this.props.store.user.first_name != null)? this.props.store.user.first_name.substr(0,1): '' + (this.props.store.user.second_name != null)? this.props.store.user.second_name.substr(0,1): ''}
                                activeOpacity={ 0.7 }
                                titleStyle={{color:'#85C8DE'}} />
                            }
                            {((this.props.store.user && this.props.store.user.avatar == null && this.props.store.user.first_name == null && this.props.store.user.second_name == null) || this.props.store.user == null) &&
                                <Avatar
				            	medium
                                rounded
                                overlayContainerStyle={{backgroundColor: 'white'}}
                                source={ require('../assets/images/user_icon_stock1.png') }
                                activeOpacity={ 0.7 } />
                            }
			            </View>
                        {!this.props.store.user &&
                        <View style={styles.textContainer}>
                            <Text style={styles.reg}>Регистрация</Text>
                        </View>
                        }
                        {this.props.store.user &&
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{(this.props.store.user && this.props.store.user.first_name != null)? this.props.store.user.first_name : '' + (this.props.store.user && this.props.store.user.second_name != null)? this.props.store.user.second_name : '' }</Text>
                            <Text style={styles.phone}>{(this.props.store.user) ? this.props.store.user.phone : ''}</Text>
                        </View>
                        }
                    </TouchableOpacity>
                    <View style={styles.listContainer}>
                        {
                            this.props.store.category.map((track, index) =>
                                <TouchableOpacity key={index} style={[styles.horizontal, styles.listblock]} activeOpacity={1} onPress={() => {this.props.navigation.navigate("SubHome",{cat: track.id, title: track.title})}}>
                                    <Image
                                        style={styles.imglist}
                                        source={{ uri:'https://promocodehealth.ru/public/storage/' + track.img }} />
                                    <Text style={styles.textlist}>{track.title}</Text>
                                </TouchableOpacity>
                            )
                        }
                        <View style={styles.separator}></View>
                        {this.props.store.user &&
                        <View>
                            <View style={[styles.horizontal, styles.listblock]}>
                                <Image
                                    style={styles.imglist}
                                    source={require('../assets/images/menu_tiket.png')} />
                                <Text style={styles.textlist}>Мои промокоды</Text>
                            </View>
                            <TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.listblock]} onPress={() => { this.props.navigation.navigate("Settings") }}>
                                <Image
                                    style={styles.imglist}
                                    source={require('../assets/images/menu_settings.png')} />
                                <Text style={styles.textlist}>Настройки</Text>
                            </TouchableOpacity>
                            <View style={styles.separator}></View>
                        </View>
                        }
                        <TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.listblock]} onPress={() => {this.props.onAddBack('Home'), this.props.navigation.navigate("Support")}}>
                            <Image
                                style={styles.imglist}
                                source={require('../assets/images/baseline_live_help_white_48dp.png')} />
                            <Text style={styles.textlist}>Поддержка</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.listblock]} onPress={() => {this.props.onAddBack('Home'), this.props.navigation.navigate("About")}}>
                            <Image
                                style={styles.imglist}
                                source={require('../assets/images/path.png')} />
                            <Text style={styles.textlist}>О проекте</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
		onAddBack: (back) => {
			dispatch({type: 'setBack', value: back})
        }
    })
)(SideMenu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DAE5EA',
    },
    topBlock: {
        paddingTop: 44,
        backgroundColor: '#85C8DE',
        paddingBottom: 20,
    },
    horizontal: {
        flexDirection: 'row',
	},
    name: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: '#fff'
    },
    reg: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: '#fff',
        marginTop: 10,
    },
    phone: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'roboto',
        opacity: 0.54
    },
    avatarContainer: {
        paddingHorizontal: 20
    },
    textContainer: {
        paddingTop: 5
    },
    imglist: {
        marginLeft: 20,
        width: 25,
        height: 25
    },
    textlist: {
        paddingLeft: 30,
        color: '#01556A',
        fontFamily: 'roboto-medium',
        fontSize: 14,
        paddingTop: 2
    },
    listblock:{
        paddingVertical: 20
    },
    separator: {
        backgroundColor: '#707070',
        height: 1
    }
});