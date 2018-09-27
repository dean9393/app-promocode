import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    Linking,
    BackHandler
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Button } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

class LoginScreen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            disButton: true,
            phone: "",
        }
        this.back = this.props.navigation.state.params.back;
    }

    // back bottom
    static navigationOptions = ({navigation}) => {
        return{
            headerLeft:(<HeaderBackButton tintColor='#fff' onPress={()=>{navigation.navigate('ReviewList')}}/>)
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('ReviewList')
            return true;
        });
    }
      
    componentWillUnmount() {
        this.backHandler.remove();
    }

    pressButton = () => {
        this.props.navigation.navigate("Pin", {phone: this.state.phone, back: this.back});
	};

    render()
    {
        return( 
        <View style={ styles.container }>
            <Text style={ styles.title }>Регистрация / Войти</Text>
            <Text style={ styles.phone_title }>Введите номер телефона</Text>
            
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
            />
            <Button
                large
                title='Отправить'
                color='#fff'
                onPress={ this.pressButton }
                buttonStyle={ styles.button }
                disabled={ this.state.disButton }
                disabledStyle={ styles.disabledButtom }
            />
            <Text style={ styles.desc }>Регистрируясь / Авторизуясь в приложении вы соглашаетесь с условиями <Text style={ styles.link } onPress={ () => { Linking.openURL('http://promocodehealth.ru/privacy.html') } }>Политики конфиденциальности</Text> и <Text style={ styles.link } onPress={ () => { Linking.openURL('http://promocodehealth.ru/terms.html') } } >Пользовательским соглашением</Text></Text>
        </View>
        )
    }
}
export default withNavigation(LoginScreen)

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.bottomButton,
        marginVertical: 20,
        marginTop: 60,
        marginBottom: 30,
        marginHorizontal: 0,
        width: '100%',
    },
    title: {
        fontFamily: 'roboto',
        fontSize: 20,
        textAlign: 'center',
        marginTop:  40,
        marginBottom: 30,
    },
    container: {
        paddingHorizontal: 15,
        flex: 1,
    },
    phone_title: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'roboto',
        marginBottom: 30,
    },
    phone: {
        fontFamily: 'roboto',
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        minWidth: 240,
        textAlign: 'center',
        paddingBottom: 10,
        color: Colors.bottomButton,
    },
    desc: {
        textAlign: 'justify',
        fontFamily: 'roboto',
        color: '#c0c0c0',
    },
    link: {
        color: 'rgb(103, 176, 214)',
    },
    disabledButtom: {
        backgroundColor: '#c0c0c0'
    }
})