import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    TextInput
} from 'react-native';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';
import axios from 'axios';
import { connect } from 'react-redux';

class PinScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = { 
            disButton: true,
            code: '',
            load: false,
            user: this.props.user
        }
    }
//
// Events...
//
    static navigationOptions = ({navigation}) => {
        return{
            tabBarVisible: false,
            title: (navigation.getParam('back','default') === 'Promo')? navigation.getParam('title','default') : 'Вход',
        }
    }

    componentWillMount(){
        this.props.navigation.setParams({back: this.props.store.back, title: this.props.store.title});
    }

    componentWillUnmount() {
        this.keyboardSub.remove()
    }

    componentDidMount() {
        this.pressButton();
        this.keyboardSub = Keyboard.addListener('keyboardDidHide', ()=> {
            this.setState({ hideblock: false })
        })
    }

//
//  Functions...
//
    getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
/* Поправить обязательно !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    checkCode = () => {
        setTimeout(()=>{
        if(this.state.trueCode == this.state.code || 1){ 
            Keyboard.dismiss()

            this.setState({
                load: true
            })

            // navigate Create Review
            if(this.props.store.back == 'CreateReview' || this.props.store.back == 'Home'){
                axios.post('https://promocodehealth.ru/public/api/registration',
                    {phone: this.props.store.phone},
                )
                .then(response => { //console.log(response);
                    this._setData(response.data.data[0].token)

                    this.props.onAddUser(response.data.data[0]);
                    this.props.onAddCity(response.data.data[0].city);
                    this.props.onAddCityId(response.data.data[0].city_id);

                    this.props.navigation.navigate('Reward')
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error.response.data.message);
                    this.setState({
                        load: false,
                        code: "",
                    })
                });
            }
            // navigate Promo without User
            else if(this.props.store.back == 'Promo' && this.props.store.user == null){
                axios.post('https://promocodehealth.ru/public/api/promocodenologin',
                    {phone: this.props.store.phone,
                    promotion_id: this.props.store.id},
                )
                .then(response => {
                    this._setData(response.data.data.token)
                    //console.log(response.data.data);
                    
                    this.props.onAddUser(response.data.data);
                    this.props.onAddCity(response.data.data.city);
                    this.props.onAddCityId(response.data.data.city_id);
                    this.props.navigation.navigate('Reward', {promocode: response.data.data.promocode, status: response.data.data.status})
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error.response.data.message);
                    this.setState({
                        load: false,
                        code: "",
                    })
                });
            }
            // navigate Promo with User
            else if(this.props.store.back == 'Promo' && this.props.store.user){
                axios.post('https://promocodehealth.ru/public/api/promocodelogin',
                    {user_id: this.props.store.user.id,
                    promotion_id: this.props.store.id},
                )
                .then(response => {
                    this.props.navigation.navigate('Reward', {promocode: response.data.data.promocode, status: response.data.data.status})
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error.response.data.message);
                    this.setState({
                        load: false,
                        code: "",
                    })
                });
            }
            else if(this.props.store.back == 'Settings'){
                axios.post('https://promocodehealth.ru/public/api/setphone',
                    {id: this.props.store.user.id,
                    phone: this.props.store.phone}
                )
                .then(response => {
                    this.props.onAddUser(response.data.data);
                    this.props.navigation.navigate(this.props.store.back);
                })
                .catch(error => {
                    console.log("wasn't send phone : " + error.response.data.message);
                    this.setState({
                        load: false,
                        code: "",
                    })
                    this.props.onAddError(true);
                    this.props.navigation.navigate('SettingsPhone');
                });
            }
        }else{
            this.setState({
                code: ""
            })
        }
        }, 1500)
    }

    _setData = async (data) => {
        try{
            await AsyncStorage.setItem('token', data)
        }
        catch(error){
            console.log('PinScreen setData: ' + error);
        }
    }

    pressCancel = () => {
        this.props.navigation.goBack()
    }

    pressButton = () => {
        var truecode = this.getRandom(1000, 9999)
        console.log(truecode)
        this.setState({
            trueCode: truecode,
            disButton: true,
        })
        /*axios.post('http://promocodehealth.ru/public/api/sms',
            {phone: this.props.store.phone},
        )
        .catch(error => console.log(error))*/
    }

    scrlto = (w) => {
        this.setState({
            hideblock: true,
        })
        setTimeout(()=>{
            this.scrl.scrollTo({x:0, y: w, animated: true})
        }, 300)
    }

    render()
    {
        return(
            <View style={ styles.container }>
                <ScrollView 
                ref={ref => this.scrl = ref}
                showsVerticalScrollIndicator={ false }
                style={ styles.scroll }>
                    <Text style={ styles.title }>{
                        (this.props.store.back == 'Promo')? 'Получение промокода' : 'Войти'
                    }</Text>
                    <Text style={ styles.desc }>Мы уже отправили вам код подтверждения на указанный номер телефона. Если код не пришел попробуйте еще раз его отправить</Text>
                    <Text style={styles.label}>Введите полученный код</Text>
                    <TextInput 
                    style={styles.input} 
                    onChangeText={code => {
                        if(code.length == 4){
                            this.setState({ 
                                code: code,
                                disButton: false,
                            })
                        }else{
                            this.setState({
                                disButton: true,
                            })
                        }
                    }}
                    onFocus={() => {this.scrlto(210)}}
                    keyboardType={'numeric'}
                    maxLength={4} />
                    <TouchableOpacity activeOpacity={1} onPress={() => this.pressButton()}>
                        <Text style={styles.more}>Отправить код повторно</Text>
                    </TouchableOpacity>
                    { this.state.hideblock && 
                        <View style={{ height: 430 }}></View>
                    }
                </ScrollView>
                <View style={styles.row}>
                    <Button
                        title='НАЗАД'
                        color='#01556A'
                        onPress={ this.pressCancel }
                        buttonStyle={ [styles.button, styles.b1]  }
                    />
                    <Button
                        title='ПОДТВЕРДИТЬ'
                        color='#fff'
                        onPress={ this.checkCode }
                        buttonStyle={ [styles.button, styles.b2] }
                        disabled={ this.state.disButton }
                        disabledStyle={ styles.disabledButtom }
                    />
                </View>
                { this.state.load &&
                <ActivityIndicator 
                    size={ 100 } 
                    color={ Colors.navigationTitle }
                    style={styles.ActivityIndicatorStyle}
                />
                }
            </View>
        )
    }
}
export default connect(state => ({
    store: state
}),
    dispatch => ({
        onAddUser: (user) => (
            dispatch({type: 'setUser', value: user})
        ),
        onAddCity: (city) => {
            dispatch({type: 'setCityTitle', value: city})
        },
        onAddCityId: (id) => {
            dispatch({type: 'setCityId', value: id})
        },
        onAddError: (error) => {
            dispatch({type: 'setError', value: error})
        }
    })
)(PinScreen)

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginBottom: 15,
        marginHorizontal: 0,
    },
    b1: {
        backgroundColor: '#DAE5EA'
    },
    b2: {
        backgroundColor: '#0097A7'
    },
    disabledButtom: {
        backgroundColor: '#c0c0c0'
    },
    title: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        marginBottom: 10,
    },
    desc: {
        textAlign: 'justify',
        fontFamily: 'roboto',
        color: '#000',
        fontSize: 14,
        opacity: 0.87,
        marginBottom: 45
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    scroll: {
        height: '100%',
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
    input: {
        fontFamily: 'roboto',
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#0097A7',
        minWidth: 240,
        textAlign: 'left',
        paddingBottom: 5,
        color: '#0097A7',
    },
    label: {
        fontSize: 12,
        fontFamily: 'roboto',
        marginBottom: 2,
    },
    more: {
        color: '#85C8DE',
        fontFamily: 'roboto-medium',
        fontSize: 14,
        marginTop: 10
    }
})