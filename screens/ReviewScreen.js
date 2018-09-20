import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Review from '../components/Review';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';

export default class ReviewScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            isLoad: false
        }
    }

    componentDidMount()
    {
        /*var id = this.props.navigation.state.params.id;
      	fetch('http://promocodehealth.ru/public/api/review/'+id)
      	.then((response) => response.json())
      	.then((responseJson) => {
        	this.setState({
              	rev: responseJson,
              	isLoad: true
            });
        })
        .catch((error) =>{
            console.error('review: '+error);
        })*/

        this.setState({
            rev: require('../components/Review.json'),
            isLoad: true,
        })
    }

    pressButton()
    {
        //let isUser = AsyncStorage.getItem('userToken');
        if(AsyncStorage.getItem('userToken'))
        {
            this.props.navigation.navigate('Login', {back:'review'});
        }else{
            this.props.navigation.navigate('Home');
        }
    }

    render()
    {
        const rev = this.state.rev;
        return(
        <View style={styles.container}>
            { this.state.isLoad && 
                <View>
                { !(rev.quantity > 0) &&
                    <ScrollView style={styles.scrollview}>
                        { rev.rev.map((review, index)=>{ 
                            return(
                                <Review key={index} data={review} />
                            )
                        })}
                    </ScrollView>
                }
                {!(rev.quantity == 0) &&
                    <View style={styles.textBlock}>
                        <Text style={{fontSize: 16}}>Отзывов еще нет</Text>
                        <Button
                            large
                            title='Добавить отзыв'
                            color='#fff'
                            onPress={this.pressButton}
                            buttonStyle={styles.button} />
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
    }
})