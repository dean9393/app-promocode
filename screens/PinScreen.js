import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Keyboard
} from 'react-native';
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import axios from 'axios';
import {connect} from 'react-redux';
import { setUser } from '../redux/app-redux';

const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (text) => {dispatch(setUser(text))}
    };
}

class PinScreen extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = { 
            time: "", 
            seconds: 10,
            disButton: true,
            code: '',
            load: false,
            user: this.props.user
        }
        this.timer = 0
        this.phone = this.props.navigation.state.params.phone
        this.back = this.props.navigation.state.params.back
    }
//
// Events...
//
    componentDidMount() {
        this.pressButton()
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

//
//  Functions...
//

    secondsToTime = (secs) => { 
        let divisor_for_minutes = secs % (60 * 60)
        let minutes = Math.floor(divisor_for_minutes / 60)
    
        let divisor_for_seconds = divisor_for_minutes % 60
        let seconds = Math.ceil(divisor_for_seconds)
        seconds = (seconds < 10) ? '0'+seconds : seconds
    
        let obj = minutes + ":" + seconds 
        return obj;
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
        });
        
        // Check if we're at zero.
        if (seconds <= 0) { 
          clearInterval(this.timer);
          this.setState({
                time: 'Отправить еще раз',
                disButton: false,
                seconds: 10,
          })
        }
    }

    startTimer = () => {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
/* Поправить обязательно !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    checkCode = (code) => {
        if(this.state.trueCode == code || 1){ 
            Keyboard.dismiss()

            this.setState({
                load: true
            })

            // navigate Create Review
            if(this.back == 'CreateReview'){
                axios.post('http://promocodehealth.ru/public/api/registration',
                    {phone: this.phone},
                )
                .then(response => {
                    this._setData(response.data.data[0].token)
                    this.props.setUser(response.data.data[0])
                    
                    this.props.navigation.navigate(this.back)
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error);
                    this.setState({
                        load: false,
                        code: "",
                        seconds: 0
                    })
                });
            }
            // navigate Promo without User
            else if(this.back == 'Promo' && this.props.user == null){
                axios.post('http://promocodehealth.ru/public/api/promocodenologin',
                    {phone: this.phone,
                    promotion_id: this.props.navigation.state.params.id},
                )
                .then(response => {
                    this._setData(response.data.data.token)
                    this.props.setUser(response.data.data)

                    this.props.navigation.navigate('Reward', {promocode: response.data.data.promocode, status: response.data.data.status})
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error);
                    this.setState({
                        load: false,
                        code: "",
                        seconds: 0
                    })
                });
            }
            // navigate Promo with User
            else if(this.back == 'Promo' && this.props.user){
                axios.post('http://promocodehealth.ru/public/api/promocodelogin',
                    {user_id: this.props.user.id,
                    promotion_id: this.props.navigation.state.params.id},
                )
                .then(response => {
                    this.props.navigation.navigate('Reward', {promocode: response.data.data.promocode, status: response.data.data.status})
                })
                .catch(error => {
                    console.log("wasn't send sms : " + error);
                    this.setState({
                        load: false,
                        code: "",
                        seconds: 0
                    })
                });
            }
        }else{
            this.setState({
                code: ""
            })
        }
    }

    _setData = async (data) => {
        try{
            await AsyncStorage.setItem('token', data)
        }
        catch(error){
            console.log('PinScreen setData: ' + error);
        }
    }

    pressButton = () => {
        var truecode = this.getRandom(1000, 9999)
        console.log(truecode)
        this.setState({
            trueCode: truecode,
            disButton: true,
            seconds: 10
        })
        this.timer = 0
        /*axios.post('http://promocodehealth.ru/public/api/sms',
            {phone: this.phone},
        )
        .catch(error => console.log(error))*/
        
        // timer
        this.startTimer();
    }

    render()
    {
        return(
            <View style={ styles.conteiner }>
                <Text style={ styles.title }>Введите код из смс</Text>
                <View style={{ alignItems: 'center', }}>
                    <SmoothPinCodeInput
                        cellStyle={{
                            borderBottomWidth: 2,
                            borderColor: '#c0c0c0',
                        }}
                        cellStyleFocused={{
                            borderColor: Colors.bottomButton,
                        }}
                        textStyle={{
                            color: Colors.bottomButton,
                            fontSize: 24,
                        }}
                        value={this.state.code}
                        onTextChange={code => this.setState({ code })}
                        onFulfill={this.checkCode}
                        autoFocus= {true}
                    />
                </View>
                <Button
                    large
                    title={ this.state.time }
                    color='#fff'
                    onPress={ this.pressButton }
                    buttonStyle={ styles.button }
                    disabled={ this.state.disButton }
                    disabledStyle={ styles.disabledButtom }
                />
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
//export default connect(mapStateToProps, mapDispatchToProps) (withNavigation(PinScreen))
export default connect(mapStateToProps, mapDispatchToProps) (PinScreen)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginVertical: 20,
        marginTop: 60,
        marginBottom: 30,
        marginHorizontal: 0,
        width: '100%',
    },
    disabledButtom: {
        backgroundColor: '#c0c0c0'
    },
    title: {
        fontFamily: 'roboto',
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        marginTop:  30,
        marginBottom: 30,
    },
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0,0,0.6)",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    },
})