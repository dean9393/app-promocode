import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import { TextField } from 'react-native-material-textfield';

class CreateReviewScreen extends React.Component
{

    constructor(props)
    {
        super(props)

        this.id = this.props.navigation.state.params.id
        this.state = {
            selectedIndex: null,
            hideblock: false,
            isLoad: false,
            positive: '',
            negative: '',
            negError: '',
            posError: '',
            statusError: '',
        }
    }

//
// Event...
//

    componentDidMount()
    {
        if(this.props.store.user == null) {
            this.props.onAddBack('CreateReview');
            this.props.navigation.navigate('Login')
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

    pressButton = () => {
        var check = 0;
        if(!this.state.positive || this.state.positive.length <= 0){
            this.setState({ posError: 'Обязательное поле' })
            check++
        }

        if(!this.state.negative || this.state.negative.length <= 0){
            this.setState({ negError: 'Обязательное поле' })
            check++
        }

        if(this.state.selectedIndex === null) {
            this.setState({statusError: 'Выберите'})
            check++
        }

        if(check == 0){
            this.setState({isLoad: true})
            axios.post('https://promocodehealth.ru/public/api/createreview',
            {
                promotion_id: this.id,
                user_id: this.props.store.user.id,
                status: this.state.selectedIndex,
                positive: this.state.positive,
                negative: this.state.negative,
            })
            .then((response) => {
                //console.log('createReview Response: ' + response);
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

    selectIndex = (index) => {
        this.setState({
            selectedIndex: index,
        })
    }

//
// Render...
//

    render()
    {       
        return(
        <View style={ styles.container }>
            { (this.props.store.user && !this.state.isLoad)  && 
                <ScrollView 
                        ref={ref => this.scrl = ref}
                        style={ styles.scroll }
                    >
                        <View style={styles.buttongroup}>
                            <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.checkButton, (this.state.selectedIndex === 1)? styles.checkBut : '']}
                            onPress={()=>{this.setState({selectedIndex:1, statusError: ''})}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Image style={styles.img} source={require('../assets/images/baseline_thumb_up_alt_black_48dp.png')} />
                                </View>
                                <Text style={styles.butText}>Понравилось</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.checkButton, (this.state.selectedIndex === 0)? styles.checkBut : '']}
                            onPress={()=>{this.setState({selectedIndex:0, statusError: ''})}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                    <Image style={styles.img} source={require('../assets/images/baseline_thumb_down_alt_black_48dp.png')} />
                                </View>
                                <Text style={styles.butText}>Не понравилось</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.error}>{this.state.statusError}</Text>
                        <TextField
                            label='Что понравилось?'
                            value={ this.state.positive }
                            onChangeText={ (positive) => this.setState({ positive }) }
                            fontSize={16}
                            error={this.state.posError}
                            multiline={true}
                            characterRestriction={120}
                            returnKeyType='next'
                            onFocus={() => {this.setState({posError: ''}), this.scrlto(115)}}
                            tintColor='#009688'
                        />
                        <TextField
                            label='Что не понравилось?'
                            value={ this.state.negative }
                            onChangeText={ (negative) => this.setState({ negative }) }
                            fontSize={16}
                            error={this.state.negError}
                            multiline={true}
                            characterRestriction={120}
                            returnKeyType='next'
                            onFocus={() => {this.setState({negError: ''}), this.scrlto(210)}}
                            tintColor='#009688'
                        />
                        <Button
                            large
                            title='Оставить отзыв'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button } 
                        />
                        { this.state.hideblock && 
                            <View style={{ height:500 }}></View>
                        }
                </ScrollView>
            }
            { (!this.props.store.user || this.state.isLoad) &&
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
export default connect(state => ({
    store: state
}),
dispatch => ({
    onAddBack: (back) => {
        dispatch({type: 'setBack', value: back})
    },
}))(CreateReviewScreen)

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
    scroll: {
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 70,
        marginBottom: 20,
    },
    img: {
        width: 72,
        height: 72,
    },
    buttongroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    butText: {
        color: '#0097A7',
        fontSize: 14,
        fontFamily: 'roboto-medium',
    },
    checkButton: {
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
    },
    checkBut:{
        borderColor: '#0097A7',
    },
    error: {
        color: 'rgb(213, 0, 0)',
        fontSize: 12,
    }
})