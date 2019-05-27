import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
	TouchableOpacity,
    SafeAreaView,
    Keyboard,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Выберите аватар',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

class SettingsGeneralScreen extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            second_name: (this.props.store.user.second_name) ? this.props.store.user.second_name : '',
            first_name: (this.props.store.user.first_name) ? this.props.store.user.first_name : '',
            hideblock: false,
            birthday: (this.props.store.user.birthday) ? this.dateFormat(this.props.store.user.birthday) : '',
            loading: false,
        }
    }

    /**
     * Приводит формат даты в привычный вид
     * @param date 
     */
    dateFormat = (date) => {
		var dat = new Date(date.replace(/\./g,"/"));
		return ((dat.getDate()<10) ? "0"+dat.getDate() : dat.getDate())+"."+(((dat.getMonth()+1)<10) ? "0"+(dat.getMonth()+1) : (dat.getMonth()+1))+"."+dat.getFullYear();
	}

    componentDidMount()
    {
        this.keyboardSub = Keyboard.addListener('keyboardDidHide', ()=> {
            this.setState({ hideblock: false })
        })
    }

    componentWillUnmount() {
        this.keyboardSub.remove()
    }

    /**
     * перемещаение экрана при фокусе на дырке
     */
    scrlto = (w) => {
        this.setState({
            hideblock: true,
        })
        setTimeout(()=>{
            this.scrl.scrollTo({x:0, y: w, animated: true})
        }, 300)
    }

    /**
     * сегодняшняя дата
     */
    getNowDate = () => {
        var dat = new Date();
        var str = dat.getDate() + '.' + (dat.getMonth()+1) + '.' + dat.getFullYear();
        return str;
    }

    /**
     * недает установить дату рождения больше сегодняшнего дня
     */
    checkDate = (newDate) => {
        var arr = newDate.split("-");
        var dat = new Date();
        var nDate = new Date(arr[2], arr[1]-1, arr[0]);
        if(dat < nDate) {
            return dat;
        }else{
            return newDate;
        }
    }

    pressButton = () => {
        setTimeout(()=>{
            Keyboard.dismiss();
            this.setState({
                loading: true
            });
            axios.post('https://promocodehealth.ru/public/api/setgeneral',
            {
                id: this.props.store.user.id,
                first_name: this.state.first_name,
                second_name: this.state.second_name,
                birthday: this.state.birthday,
            })
            .then(response => { //console.log(response.data.data);
                this.props.onAddUser(response.data.data);

                this.props.navigation.navigate('Settings');
            })
            .catch(error => {
                console.log("General Settings : " + error.response.data.message);
                this.setState({
                    loading: false
                })
            });
        }, 1500)
    }

    imgPicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render()
    {
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
					<ScrollView ref={ref => this.scrl = ref}
                        style={ styles.scroll }>
                        <Text style={styles.title}>Общие настроки</Text>
                        <View style={styles.center}>
                            <TouchableOpacity onPress={this.imgPicker}>
                                {(this.props.store.user && this.props.store.user.avatar != null) &&
                                    <Avatar
                                    rounded
                                    overlayContainerStyle={{backgroundColor: 'white'}}
                                    source={{ uri:'http://promocodehealth.ru/public/storage/' + this.props.store.user.avatar }}
                                    activeOpacity={ 0.7 }
                                    width={150}
                                    height={150} />
                                }
                                {(this.props.store.user && this.props.store.user.avatar == null && (this.props.store.user.first_name != null || this.props.store.user.second_name != null)) &&
                                    <Avatar
                                    rounded
                                    overlayContainerStyle={{backgroundColor: Colors.navigationTitle}}
                                    title={(this.props.store.user.first_name != null)? this.props.store.user.first_name.substr(0,1): '' + (this.props.store.user.second_name != null)? this.props.store.user.second_name.substr(0,1): ''}
                                    activeOpacity={ 0.7 } 
                                    width={150}
                                    height={150} />
                                }
                                {((this.props.store.user && this.props.store.user.avatar == null && this.props.store.user.first_name == null && this.props.store.user.second_name == null) || this.props.store.user == null) &&
                                    <Avatar
                                    rounded
                                    overlayContainerStyle={{backgroundColor: 'white'}}
                                    source={ require('../assets/images/user_icon_stock1.png') }
                                    activeOpacity={ 0.7 } 
                                    width={150}
                                    height={150} />
                                }
                                <Image style={styles.camimg} source={require('../assets/images/cam.png')} />
                            </TouchableOpacity>
                        </View>
                        <TextField
                            label='Фамилия'
                            value={ this.state.second_name }
                            onChangeText={ (second_name) => this.setState({ second_name }) }
                            fontSize={16}
                            maxLength={100}
                            returnKeyType='next'
                            onFocus={() => {this.scrlto(215)}}
                            tintColor='#0097A7'
                            onSubmitEditing={() => {this.first_name.focus()}}
                            blurOnSubmit={false}
                        />
                        <TextField
                            ref={(input) => { this.first_name = input; }}
                            label='Имя'
                            value={ this.state.first_name }
                            onChangeText={ (first_name) => this.setState({ first_name }) }
                            fontSize={16}
                            maxLength={100}
                            returnKeyType='next'
                            onFocus={() => {this.scrlto(280)}}
                            tintColor='#0097A7'
                        />
                        <Text style={styles.subtitle}>Дата рождения</Text>
                        <DatePicker
                            style={{width: '100%'}}
                            date={this.state.birthday}
                            mode="date"
                            placeholder="Дата рождения"
                            format="DD.MM.YYYY"
                            maxDate={this.getNowDate()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    borderTopWidth: 0,
                                    borderLeftWidth: 0, 
                                    borderRightWidth: 0,
                                    alignItems: 'flex-start',
                                },
                                dateText: {
                                    fontSize: 16,
                                },
                            }}
                            showIcon={false}
                            onDateChange={(date) => { this.setState({birthday: this.checkDate(date)})} }
                        />
                        <Button
                            large
                            title='Сохранить'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button } 
                        />
                        { this.state.hideblock && 
                            <View style={{ height:320 }}></View>
                        }
                        <View style={{ height:5 }}></View>
                    </ScrollView>
                    { this.state.loading &&
                        <ActivityIndicator 
                            size={ 100 } 
                            color={ Colors.navigationTitle }
                            style={styles.ActivityIndicatorStyle}
                        />
                    }
                </View>
            </SafeAreaView>
        )
    }
}
export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
		onAddUser: (user) => {
			dispatch({type: 'setUser', value: user})
        }
    })
)(SettingsGeneralScreen);
const styles = StyleSheet.create({
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        paddingVertical: 20,
    },
    scroll: {
        paddingHorizontal: 15,
    },
    camimg: {
        width: 70,
        height: 70,
        position: 'absolute',
        bottom: -5,
        right: -5,
    },
    imgContainer: {
        width: 160,
        height: 160,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#0097A7',
        marginTop: 15,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 12,
        opacity: 0.5,
        marginTop: 15,
        bottom: -2,
    },
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(255,255,255,0.6)",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    },
})