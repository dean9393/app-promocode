import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import Review from '../components/Review';
import { Button } from 'react-native-elements'
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import axios from 'axios';

class ReviewScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state={
            loading: true,
            empty: false,
            rev: null,
            page: 0,
            id: this.props.navigation.state.params.id,
            posQ: 0,
            negQ: 0,
        }
    }

    componentDidMount()
    {    
        this.dataLoad();
    }

    /**
	 * обновление информации
	 */
	willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
		  if(this.props.store.rReview){
				this.setState({
                    loading: true,
                    page: 0,
                    empty: false,
                    rev: null,
                    posQ: 0,
                    negQ: 0,
                    isBuy: false,
                    disButton: false,
				})
                this.dataLoad()
                this.props.onAddRReview(false)
		  }
        }
    );

    dataLoad = () => {
        setTimeout(()=>{
            axios.post('https://promocodehealth.ru/public/api/review',
            {
                id: this.state.id,
                page: this.state.page,
                user_id: (this.props.store.user) ? this.props.store.user.id : 0
            })
            .then((response) =>
                { //console.log(response.data);
                    if(response.data != false){
                        this.setState({
                            isBuy: (response.data.received.length == 0) ? true : false,
                            disButton: (response.data.received.length == 0) ? true : false,
                        })
                    }
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
                                posQ: response.data.positive_quantity,
                                negQ: response.data.negative_quantity,
                            })
                        }else {
                            this.setState({
                                rev: this.state.rev.concat(response.data.rev),
                                page: this.state.page + 1,
                                posQ: response.data.positive_quantity,
                                negQ: response.data.negative_quantity,
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

    pressButton = () => {
        this.props.navigation.navigate('CreateReview', {id: this.state.id})
    }

    render()
    {
        return(
        <View style={styles.container}>
                <View>
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
                            title={(this.state.isBuy) ? 'Вы не получали промокод' : 'Добавить отзыв'}
                            color='#fff'
                            onPress={ this.pressButton }
                            buttonStyle={ styles.button }
                            disabled={ this.state.disButton } />
                    </View>
                }
                </View>
                {this.state.page > 0 &&
                <Button
                    large
                    title={(this.state.isBuy) ? 'Вы не получали промокод' : 'Добавить отзыв'}
                    color='#01556A'
                    onPress={ this.pressButton }
                    buttonStyle={ styles.button2 }
                    disabled={ this.state.disButton } />
                }
        </View>
        )
    }

    renderHeader = () => {
        return (
            this.state.page > 0 &&
            <View style={styles.row}>
                <TouchableOpacity activeOpacity={1} style={styles.center} onPress={()=>{this.props.navigation.navigate('CatReview',{id: this.state.id, title: 'Понравилось'})}}>
                    <Image style={styles.hands} source={require('../assets/images/baseline_thumb_up_alt_black_48dp.png')} />
                    <Text style={styles.handText}>Понравилось  <Text style={styles.handQuan}>({this.state.posQ})</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.center} onPress={()=>{this.props.navigation.navigate('CatReview',{id: this.state.id, title: 'Не понравилось'})}}>
                    <Image style={styles.hands} source={require('../assets/images/baseline_thumb_down_alt_black_48dp.png')} />
                    <Text style={styles.handText}>Не понравилось  <Text style={styles.handQuan}>({this.state.negQ})</Text></Text>
                </TouchableOpacity>
            </View>
        )
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
}),
dispatch => ({
    onAddRReview: (ref) => {
        dispatch({type: 'setRReview', value: ref})
    }
})
)(ReviewScreen)

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
    hands: {
        width: 72,
        height: 72,
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
    center: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})