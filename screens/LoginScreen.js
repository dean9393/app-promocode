import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    Linking,
    Keyboard,
    BackHandler
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Button } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

class LoginScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            disButton: (this.props.store.user && this.props.store.user.phone.length == 18)? false : true,
            phone: (this.props.store.user === null) ? '' : this.props.store.user.phone,
            hideblock: false,
        }
    }

    // back bottom
    static navigationOptions = ({navigation}) => {
        return{
            headerLeft:(<HeaderBackButton tintColor='#fff' onPress={()=>{ 
                navigation.navigate((navigation.getParam('back','default') === 'CreateReview')? 'ReviewList' : navigation.getParam('back','default'))
            }}/>),
            tabBarVisible: false,
            title: (navigation.getParam('back','default') === 'Promo')? navigation.getParam('title','default') : 'Вход',
        }
    }

    componentWillMount(){
        this.props.navigation.setParams({back: this.props.store.back, title: this.props.store.title});
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate(this.props.store.back)
            return true;
        });
        this.keyboardSub = Keyboard.addListener('keyboardDidHide', ()=> {
            this.setState({ hideblock: false })
        })
    }
      
    componentWillUnmount() {
        this.backHandler.remove();
        this.keyboardSub.remove()
    }

    pressButton = () => {
        if(!this.state.disButton){
            this.props.onAddPhone(this.state.phone);
            this.props.navigation.navigate("Pin");
        }
    };
    
    pressCancel = () => {
        this.props.navigation.navigate(this.props.store.back);
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
                    (this.props.store.back == 'Promo')? 'Получение промокода' : (this.props.store.back == 'Settings')? 'Изменить номер' : 'Войти'
                }</Text>
                {(this.props.store.back == 'Promo') &&
                    <Text style={ styles.desc }>Введите ваш номер телефона, на него мы пришлем код для подтверждения участия в акции партнера проекта PromoCodeHealth</Text>
                }
                {(this.props.store.back != 'Promo' && this.props.store.back == 'Settings') &&
                    <Text style={ styles.desc }>Введите ваш номер телефона, на него мы пришлем код для подтверждения изменения номера</Text>
                }
                {(this.props.store.back != 'Promo' && this.props.store.back != 'Settings') &&
                    <Text style={ styles.desc }>Введите ваш номер телефона, на него мы пришлем код для подтверждения регистрации</Text>
                }
                
                <Text style={ styles.phone_title }>Введите ваш номер телефона</Text>
                
                <TextInputMask 
                    ref={ref => (this._myphone = ref)}
                    style={ styles.phone }
                    type={'cel-phone'}
                    placeholder= '+7 (000) 000-00-00'
                    options={{
                        dddMask: '+7 (999) 999-99-99',
                    }}
                    value={ this.state.phone }
                    onChangeText={phone => {
                        if(phone.length == 18){
                            this.setState({
                                disButton: false,
                                phone: phone
                            })
                        }else{
                            if(!this.state.disButton)
                                this.setState({
                                    disButton: true,
                                    phone: phone
                                })
                        }
                    }}
                    maxLength={18}
                    underlineColorAndroid='transparent'
                    selectionColor={Colors.bottomButton}
                    onFocus={() => {this.scrlto(190)}}
                    onSubmitEditing={() => {this.pressButton}}
                />
                {(this.props.store.user == null) &&
                <Text style={ styles.subdesc }>Регистрируясь в приложении вы соглашаетесь с условиями <Text style={ styles.link } onPress={ () => { Linking.openURL('https://promocodehealth.ru/public/privacy.html') } }>Политики конфиденциальности</Text> и <Text style={ styles.link } onPress={ () => { Linking.openURL('https://promocodehealth.ru/public/terms.html') } } >Пользовательским соглашением</Text></Text>
                }
                { this.state.hideblock && 
                    <View style={{ height:390 }}></View>
                }
            </ScrollView>
            <View style={styles.row}>
                <Button
                    title='ОТМЕНА'
                    color='#01556A'
                    onPress={ this.pressCancel }
                    buttonStyle={ [styles.button, styles.b1]  }
                />
                <Button
                    title='ОТПРАВИТЬ КОД'
                    color='#fff'
                    onPress={ this.pressButton }
                    buttonStyle={ [styles.button, styles.b2] }
                    disabled={ this.state.disButton }
                    disabledStyle={ styles.disabledButtom }
                />
            </View>
        </View>
        )
    }
}
export default connect(state => ({
        store: state
    }),
    dispatch => ({
		onAddPhone: (phone) => {
			dispatch({type: 'setPhone', value: phone})
		}
	})
)(LoginScreen)

const styles = StyleSheet.create({
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
    title: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        marginBottom: 10,
    },
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    phone_title: {
        fontSize: 12,
        fontFamily: 'roboto',
        marginBottom: 2,
    },
    phone: {
        fontFamily: 'roboto',
        fontSize: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#0097A7',
        minWidth: 240,
        textAlign: 'left',
        paddingBottom: 5,
        color: '#0097A7',
    },
    desc: {
        textAlign: 'justify',
        fontFamily: 'roboto',
        color: '#000',
        fontSize: 14,
        opacity: 0.87,
        marginBottom: 45
    },
    subdesc: {
        textAlign: 'justify',
        fontFamily: 'roboto',
        color: '#000',
        fontSize: 14,
        opacity: 0.87,
        marginTop: 20
    },
    link: {
        color: '#0097A7',
    },
    disabledButtom: {
        backgroundColor: '#c0c0c0'
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
    }
})