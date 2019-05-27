import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
import Review from '../components/Review';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import axios from 'axios';

class CatReviewScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            loading: true,
            empty: false,
            rev: null,
            page: 0,
            id: 0,
            quantity: 0,
            status: 0,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
	});

    componentDidMount()
    {    
        var f = (this.props.navigation.state.params.title === 'Понравилось')? 1:0;
        this.setState({
            id: this.props.navigation.state.params.id,
            status: f
        })

        this.dataLoad();
    }

    dataLoad = () => {
        setTimeout(()=>{
            axios.post('https://promocodehealth.ru/public/api/catreview',
            {
                id: this.state.id,
                page: this.state.page,
                status: this.state.status,
            })
            .then((response) =>
                { //console.log(response.data);
                    if(response.data.rev == false) {
                        if(this.state.rev == null){
                            this.setState({
                                loading: false,
                                empty: true,
                            })
                        }else {
                            this.setState({
                                loading: false,
                                rev: this.state.rev.concat([])
                            })
                        }
                    }
                    if(response.data.rev != false){
                        if(this.state.rev == null){
                            this.setState({
                                rev: response.data.rev,
                                page: this.state.page + 1,
                                quantity: response.data.quantity,
                            })
                        }else {
                            this.setState({
                                rev: this.state.rev.concat(response.data.rev),
                                page: this.state.page + 1,
                                quantity: response.data.quantity,
                            })
                        }
                    }
                }            
            )
            .catch(error => {
                console.log('ReviewList: ' + error);
            })
        }, 1500)
    }

    render()
    {
        return(
            <View style={styles.container}>
                { !this.state.empty &&
                    <View>
                        <FlatList
							style={ styles.scrollview }
							data={ this.state.rev }
							renderItem={(rev) => (
								<Review data={ rev } />
							)}
                            keyExtractor={rev => rev.id.toString()}
                            ListHeaderComponent={ this.renderHeader }
							ListFooterComponent={ this.renderFooter }
							onEndReached={ this.dataLoad }
							onEndReachedThreshold={1.0}
							showsVerticalScrollIndicator={false}
							
							loading={true}
						/>
                    </View> 
                }
                { this.state.empty &&
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
                { (this.state.page > 0) &&
                <Button
                    large
                    title='Добавить отзыв'
                    color='#01556A'
                    onPress={ this.pressButton }
                    buttonStyle={ styles.button2 } />
                }
            </View>
        )
    }

    renderHeader = () => {
        return(
            this.state.page > 0 &&
            <View style={styles.center}>
                {this.state.status == 1 &&
                    <Image style={styles.hands} source={require('../assets/images/baseline_thumb_up_alt_black_48dp.png')} />
                }
                {this.state.status == 0 &&
                    <Image style={styles.hands} source={require('../assets/images/baseline_thumb_down_alt_black_48dp.png')} />
                }
                <Text style={styles.handText}>{this.props.navigation.state.params.title}  <Text style={styles.handQuan}>({this.state.quantity})</Text></Text>
            </View>
        )
    }

    pressButton = () => {
        this.props.navigation.navigate('CreateReview', {id: this.state.id})
    }

    renderFooter = () => {
		return (
			<View>
                {this.state.loading &&
                <View style={(this.state.rev) ? styles.loader : styles.centerLoader}>
                    <ActivityIndicator size={ 50 } color={ Colors.navigationTitle } />
                </View>
                }
                { !this.state.loading &&
				<View style={styles.empty}></View>
                }
            </View>  
		);
	};
}
export default connect(state => ({
    store: state
}),)(CatReviewScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    hands: {
        width: 72,
        height: 72,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
    },
    button2: {
        backgroundColor: '#DAE5EA',
        marginVertical: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        height: 80,
        width: '100%',
    },
    loader: {
        paddingTop: 15,
        paddingBottom: 95,
    },
    centerLoader: {
		padding: 10,
		marginTop: (Dimensions.get('window').height / 2) - 80,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    handText: {
        color: '#0097A7',
        fontSize: 14,
        fontFamily: 'roboto-medium',
    },
    handQuan: {
        color: '#D5D5D5',
        fontSize: 16,
        fontFamily: 'roboto',
    },
})