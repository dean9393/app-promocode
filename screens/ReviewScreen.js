import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    Dimensions, AsyncStorage
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Review from '../components/Review';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';
import { withNavigation, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { setUser } from '../redux/app-redux';
import axios from 'axios';

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

class ReviewScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            isLoad: false
        }
        this.id = 0;
    }

    componentDidMount()
    {
       this.id = this.props.navigation.state.params.id;
      	/*fetch('http://promocodehealth.ru/public/api/review/'+this.id)
      	.then((response) => response.json())
      	.then((responseJson) => { console.log(responseJson)
        	this.setState({
              	rev: responseJson,
              	isLoad: true
            });
        })
        .catch((error) =>{
            console.error('review: '+error);
        })*/

        /*willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
              //this.forceUpdate();
              console.log(this.props.navigation.state.params.sign)
            }
        );*/

        axios.post('http://promocodehealth.ru/public/api/review',
        {
            id: this.id
        })
        .then((response) =>
            { console.log(response.data);
                this.setState({
                    rev: response.data,
                    isLoad: true
                });
            }            
        )
        .catch(error => {
			console.log('ReviewList: ' + error);
        })
        
        /*willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
              this.forceUpdate();
              //console.log(this.props.navigation.state.params.sign)
            }
        )

        didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
              this.forceUpdate();
              //console.log(this.props.navigation.state.params.sign)
            }
        )*/

        /*this.setState({
            rev: require('../components/Review.json'),
            isLoad: true
        })*/
    }

    componentWillUnmount(){
        /*willFocus.remove();
        didFocus.remove();*/
    }

    pressButton = () => {
        this.props.navigation.navigate('CreateReview', {id: this.id})
    }

    render()
    {
        const rev = this.state.rev;
        return(
        <View style={styles.container}>
            { this.state.isLoad && 
                <View>
                { (rev.quantity > 0) &&
                    <ScrollView style={styles.scrollview}>
                        { rev.rev.map((review, index)=>{ 
                            return(
                                <Review key={index} data={review} />
                            )
                        })}
                        <Button
                            large
                            title='Добавить отзыв'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button2 } />
                    </ScrollView>                   
                }
                { (rev.quantity == 0) &&
                    <View style={styles.textBlock}>
                        <Text style={{fontSize: 16}}>Отзывов еще нет</Text>
                        <Button
                            large
                            title='Добавить отзыв'
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button } />
                    </View>
                }
                </View>
            }
            { !this.state.isLoad &&
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBlock: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview: {
		paddingLeft: 10,
        paddingRight: 10,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
    },
    button2: {
        backgroundColor: Colors.bottomButton,
        marginVertical: 20,
    }
})