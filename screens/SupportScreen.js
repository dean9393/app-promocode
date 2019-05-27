import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
    Image,
    ScrollView,
    Keyboard,
    ActivityIndicator,
    SafeAreaView,
    Linking
} from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux';
import axios from 'axios';
import { TextField } from 'react-native-material-textfield';

class SupportScreen extends React.Component {
    constructor(props)
    {
        super(props)

        this.state = {
            loading: false,
            email: (this.props.store.user.email)? this.props.store.user.email :'',
            text: '',
            emailError: '',
            textError: '',
            hideblock: false,
        }
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

    scrlto = (w) => {
        this.setState({
            hideblock: true,
        })
        setTimeout(()=>{
            this.scrl.scrollTo({x:0, y: w, animated: true})
        }, 300)
    }

    pressButton = () => {
        var check = 0;
        if(!this.state.email || (this.state.email.length <= 0)){
            this.setState({ emailError: 'Обязательное поле' })
            check++
        }
        else if(!this.validateEmail(this.state.email)){
            this.setState({ emailError: 'Недопустимый email' })
            check++
        }
        if(!this.state.text || this.state.text.length <= 0){
            this.setState({ textError: 'Обязательное поле' })
            check++
        }
        if(check == 0){
            this.setState({loading: true})
            axios.post('https://promocodehealth.ru/public/api/question',
            {
                text: this.state.text,
                user_id: (this.props.store.user) ? this.props.store.user.id : null,
                email: this.state.email,
            })
            .then((response) => {
                this.props.navigation.navigate('RewardSupport')
            })
            .catch(error => console.log('Support Error: ' + error))
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render(){
        return(
        <SafeAreaView style={styles.areaContainer}>
            <View style={ styles.container }>
                <ScrollView 
                        ref={ref => this.scrl = ref}
                        style={ styles.scroll }
                    >
                    <Text style={styles.title}>Мы в соц. медиа</Text>
                    <Text style={styles.desc}>Есть вопросы? У нас есть ответы! Мы онлайн 24/7 в самых популярных сервисах. Пишите. Звоните. Мы всегда на связи.</Text>
                    <View style={styles.row}>
                        <TouchableOpacity activeOpacity={1} style={styles.imgContainer} onPress={() => {Linking.openURL('https://api.whatsapp.com/send?phone=79673004952')}}>
                            <Image source={require('../assets/images/whatsappicon.png')} style={styles.img} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Напишите нам письмо</Text>
                    <View style={styles.blueBox}>
                        <Text style={styles.subTitle}>Мы ответим вам в кратчайшие сроки!</Text>
                        <TextField
                            label='Адрес вашей почты'
                            value={ this.state.email }
                            onChangeText={ (email) => this.setState({ email }) }
                            fontSize={16}
                            error={this.state.emailError}
                            maxLength={120}
                            returnKeyType='next'
                            onFocus={() => {this.setState({emailError: ''}), this.scrlto(315)}}
                            tintColor='#0097A7'
                        />
                        <TextField
                            label='Текст вашего письма'
                            value={ this.state.text }
                            onChangeText={ (text) => this.setState({ text }) }
                            fontSize={16}
                            error={this.state.textError}
                            multiline={true}
                            characterRestriction={120}
                            returnKeyType='send'
                            onFocus={() => {this.setState({textError: ''}), this.scrlto(385)}}
                            tintColor='#0097A7'
                        />
                        <Button
                            large
                            title='Отправить письмо'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button } 
                        />
                    </View>
                    { this.state.hideblock && 
                        <View style={{ height:440 }}></View>
                    }
                    <View style={{ height:5 }}></View>
                </ScrollView>
                
                { this.state.loading &&
                <ActivityIndicator
                    color='#1E88E5'
                    size='large'
                    style={styles.ActivityIndicatorStyle}
                />
                }
            </View>
        </SafeAreaView>
        )
    }
}
export default connect(state => ({
    store: state
}),
)(SupportScreen)

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
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    desc: {
        fontFamily: 'roboto',
        fontSize: 16,
        paddingHorizontal: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20
    },
    img: {
        width: 48,
        height: 48,
    },
    subTitle: {
        fontSize: 16,
        paddingTop: 10,
        opacity: 0.5,
    },
    button: {
        backgroundColor: '#0097A7',
        marginTop: 15,
        marginBottom: 15,
    },
    blueBox: {
        backgroundColor: '#D7E2E7',
        marginHorizontal: 5,
        paddingHorizontal: 10
    },
    ActivityIndicatorStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});