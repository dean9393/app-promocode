import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    Platform,
    Keyboard,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';
import axios from 'axios';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import { connect } from 'react-redux';
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

class CreateReviewScreen extends React.Component
{

    constructor(props)
    {
        super(props)

        this.id = this.props.navigation.state.params.id
        this.state = {
            selectedIndex: 1,
            negative_scroll: false,
            positive_scroll: false,
            hideblock: false,
            scroll: 0,
            isLoad: false
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

//
// Event...
//

    componentDidMount()
    {
        if(this.props.user == null) {
            this.props.navigation.navigate('Login', {back: 'CreateReview',})
        }

        this.keyboardSub = Keyboard.addListener('keyboardDidHide', ()=> {
            this.setState({ hideblock: false })
        })
    }

    componentWillUnmount() {
        this.keyboardSub.remove()
    }

//
// Function...
//

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    pressButton = () => {
        var check = 0;
        if(!this.state.positive || this.state.positive.length <= 0){
            this.setState({ positive_status: true })
            check++
        } else {
            this.setState({ positive_status:false })
        }

        if(!this.state.negative || this.state.negative.length <= 0){
            this.setState({ negative_status: true })
            check++
        } else {
            this.setState({ negative_status:false })
        }

        if(check == 0){
            this.setState({isLoad: true})
            axios.post('http://promocodehealth.ru/public/api/createreview',
            {
                promotion_id: this.id,
                user_id: this.props.user.id,
                status: this.state.selectedIndex,
                positive: this.state.positive,
                negative: this.state.negative,
            })
            .then((response) => {
                console.log('createReview Response: ' + response);
                this.props.navigation.navigate('ReviewList', {id: this.id})
            })
            .catch(error => console.log('createReview Error: ' + error))
        }
    }

    scrlto = (w) => {
        this.setState({
            hideblock: true,
        })
        setTimeout(()=>{
            this.scrl.scrollTo({x:0, y: w, animated: true})
        }, 300)
    }

//
// Render...
//

    render()
    {

        const { selectedIndex } = this.state
        const options = [ "Отридцательный", "Положительный" ];
        
        return(
        <View style={ styles.container }>
            { (this.props.user && !this.state.isLoad)  && 
                <View>
                    <ScrollView 
                        ref={ref => this.scrl = ref}
                        style={ styles.scroll }
                    >
                        <Text style={ styles.title }>Оставить Отзыв</Text>
                        <ButtonGroup
                            onPress={this.updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={ options }
                            containerStyle={{height: 100}}
                            selectedButtonStyle={{ backgroundColor: Colors.bottomButton }}
                            buttonStyle={{ backgroundColor: '#fff' }}
                            selectedTextStyle={{ color: '#fff' }}
                            textStyle={{ color: Colors.bottomButton }}
                        />
                        <Text style={ styles.subtitle }>Понравилось:</Text>
                        <View style={ styles.textAreaContainer } ref={r => this.positive = r} >
                            <TextInput 
                                style={ styles.textArea }
                                multiline={ true }
                                numberOfLines={ 10 }
                                maxLength={ 255 }
                                placeholder='Что понравилось?'
                                placeholderTextColor="grey"
                                underlineColorAndroid="transparent"
                                onChangeText={(positive) => this.setState({positive})}
                                value={ this.state.positive }
                                returnKeyType='next'
                                onSubmitEditing={event => this.negative.focus()}
                                onFocus={() => {this.scrlto(190)}}
                            />
                        </View>
                        { this.state.positive_status && 
                            <Text style={ styles.error }>Это поле обязательно к заполнению</Text> 
                        }
                        <Text style={ styles.subtitle }>Не понравилось:</Text>

                        <View style={ styles.textAreaContainer } >
                            <TextInput 
                                style={ styles.textArea }
                                multiline={ true }
                                numberOfLines={ 10 }
                                maxLength={ 255 }
                                placeholder='Что не понравилось?'
                                placeholderTextColor="grey"
                                underlineColorAndroid="transparent"
                                onChangeText={(negative) => this.setState({negative})}
                                value={this.state.negative}
                                ref={r => this.negative = r}
                                returnKeyType='go'
                                onSubmitEditing={event => this.pressButton}
                                onFocus={() => {this.scrlto(400)}}
                            />
                        </View>
                        { this.state.negative_status && 
                            <Text style={ styles.error }>Это поле обязательно к заполнению</Text>
                        }
                        <Button
                            large
                            title='Добавить отзыв'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button } 
                        />
                        { this.state.hideblock && 
                            <View style={{ height:360 }}></View>
                        }
                    </ScrollView>
                </View>
            }
            { !this.props.user &&
                <ActivityIndicator
                    color='#1E88E5'
                    size='large'
                    style={styles.ActivityIndicatorStyle}
                />
                
            }
            { this.state.isLoad &&
                <ActivityIndicator
                color='#1E88E5'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
            }
        </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    title: {
        textAlign: 'center',
        fontFamily: 'roboto',
        fontSize: 22,
        marginVertical: 20,
    },
    subtitle: {
        fontFamily: 'roboto',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 15,
    },
    scroll: {
        paddingHorizontal: 15,
    },
    textAreaContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        opacity:1
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start",
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
        marginBottom: 20,
    },
})