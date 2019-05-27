import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	Dimensions, 
	TouchableOpacity,
	WebView,
	Linking,
	ActivityIndicator,
	Image,
	Platform
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Review from '../components/Review';
import HTML from 'react-native-render-html';
import Slider from '../components/Slider';
import { connect } from 'react-redux';
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import axios from 'axios';

class PromoScreen extends React.Component {

  	constructor(props)
  	{
    	super(props);
    	this.state={
			loading: true,
			disButton: false,
			isBuy: false,
			promo: null
		}
		this.promo = null;
		this.res = this.props.navigation.state.params.id;
	}

	/**
	 * выставляю Заголовок
	 */
	static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
	});
	
	/**
	 * обновление информации
	 */
	willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
          //this.forceUpdate();
		  //console.log('FOCUS')
		  if(this.props.store.rPromo){
				this.setState({
					loading: true,
				})
				this.dataLoad()
				this.props.onAddRPromo(false)
		  }
        }
    );

	/**
	 * при создании экрана
	 */
    componentDidMount() {
		this.dataLoad();
	}
	
	/**
	 * загрузка данных с сервера
	 */
	dataLoad = () => {
		axios.post('https://promocodehealth.ru/public/api/promo',{
			id: this.res,
			user_id: (this.props.store.user)? this.props.store.user.id : 0
		})
		.then(response => {	
		//console.log(response);
			this.setState({
				promo: response.data,
				loading: false,
				isBuy: (response.data.received.length == 0) ? true : false,
				disButton: (response.data.received.length == 0) ? false : true,
			})
		})
		.catch(error => {
			console.log('promo: ' + error);
		})
	}

    render()
    {
		const promo = this.state.promo;

		const imgs = [];
        let url = 'https://promocodehealth.ru/public/storage/';

		if( !this.state.loading ) {
        	(promo.img1) ? imgs.push(url + promo.img1) : '';
        	(promo.img2) ? imgs.push(url + promo.img2) : '';
			(promo.img3) ? imgs.push(url + promo.img3) : '';
		}

        return(
            <View style={styles.body}>
				{ !this.state.loading && 
				<View>
				<ScrollView>
					{ (imgs.length == 1) &&
                        <Image 
                            source={{uri: imgs[0]}} 
                            style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.766 }} />
					}
					{(imgs.length > 1) &&
						<Slider 
							images={ imgs }
							r={ 0 }
							w={ Dimensions.get('window').width }
							h={ Dimensions.get('window').width  / 1.766 }
							isScroll={ true }
						/>
					}
					<View style={styles.container}>
						<Text style={styles.title}>{promo.title}</Text>
						<View style={[ styles.horizontal, styles.rowContainer, styles.allrow ]}>
							<View>
								<View style={styles.horizontal}>
									<Image style={ styles.imgRow } source={require('../assets/images/percent.png')} />
									<Text style={ styles.textRow }> { (promo.sale != []) ? promo.sale : 0 }</Text>
								</View>
								<Text style={styles.descRow}>Скидка</Text>
							</View>
							<View>
								<View style={styles.horizontal}>
									<Image style={ styles.imgRow } source={require('../assets/images/baseline_access_time_black_24dp.png')} />
									<Text style={ styles.textRow }>{ this._getDate(promo.date_end) }</Text>
								</View>
								<Text style={styles.descRow}>Дней</Text>
							</View>
							<View>
								<View style={styles.horizontal}>
									<Image style={ styles.imgRow } source={require('../assets/images/baseline_message_black_24dp.png')} />
									<Text style={ styles.textRow }>{ promo.rev_quantity }</Text>
								</View>
								<Text style={styles.descRow}>Отзывов</Text>
							</View>
							<View>
								<View style={styles.horizontal}>
									<Image style={ styles.imgRow } source={require('../assets/images/baseline_loyalty_black_48dp.png')} />
									<Text style={ styles.textRow }>{ promo.rec_promo }</Text>
								</View>
								<Text style={styles.descRow}>Покупок</Text>
							</View>
							<View>
								<View style={styles.horizontal}>
									<Image style={ styles.imgRow } source={require('../assets/images/roub.png')} />
									<Text style={ styles.textRow }>{ promo.price * ((100 - promo.sale) / 100) }</Text>
								</View>
								<Text style={styles.descRow}>Цена</Text>
							</View>
						</View>
						{ promo.sales.length &&
						<View style={styles.block}>
							<Text style={styles.title}>Скидка</Text>
							{ this._renderSales() }
						</View>
						}
						<View style={styles.block}>
							<TouchableOpacity activeOpacity={1} onPress={ ()=>{ Linking.openURL('http://'+promo.site)} }>
								<View style={[styles.horizontal, styles.allrow]}>
									<Text style={styles.title}>Инфо</Text>
									<Text style={styles.link}>{this._siteFormat(promo.site)}</Text>
								</View>
							</TouchableOpacity>
							<View style={[styles.horizontal, styles.allrow, styles.padHorizon]}>
								<Text style={styles.greyColor}>Начало акции</Text>
								<Text>{this._dateFormat(promo.date_start)}</Text>
							</View>
							<View style={[styles.horizontal, styles.allrow, styles.padHorizon]}>
								<Text style={styles.greyColor}>Конец акции</Text>
								<Text>{this._dateFormat(promo.date_end)}</Text>
							</View>
						</View>
						<View style={styles.block}>
							<TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.allrow]} onPress={()=>{this.props.navigation.navigate('Info', {title:'Условия', text:promo.conditions, isBuy:this.state.isBuy, user:this.props.user, id:this.props.navigation.state.params.id, disButton:this.state.disButton, title: promo.title})}}>
								<Text style={styles.title}>Условия</Text>
								<Text style={styles.link}>ПОДРОБНЕЕ</Text>
							</TouchableOpacity>
							<View style={styles.padHorizon}>
								<HTML html={this._textPreview(promo.conditions)} />
							</View>
						</View>
						<View style={styles.block}>
							<TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.allrow]} onPress={()=>{this.props.navigation.navigate('Info', {title:'Описание', text:promo.description, isBuy:this.state.isBuy, user:this.props.user, id:this.props.navigation.state.params.id, disButton:this.state.disButton, title: promo.title})}}>
								<Text style={styles.title}>Описание</Text>
								<Text style={styles.link}>ПОДРОБНЕЕ</Text>
							</TouchableOpacity>
							<View style={styles.padHorizon}>
								<HTML html={this._textPreview(promo.description)} />
							</View>
						</View>
						<View style={styles.block}>
							<TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate('InfoMap', {id: this.props.navigation.state.params.id, isBuy:this.state.isBuy, user:this.props.user, disButton:this.state.disButton, title: promo.title})}}>
								<View style={[styles.horizontal, styles.allrow]}>
									<Text style={styles.title}>Карта</Text>
									<Text style={styles.link}>ОТКРЫТЬ</Text>
								</View>
								<WebView source={{uri:'http://promocodehealth.ru/public/onemap/'+this.props.navigation.state.params.id}} style={styles.map} />
							</TouchableOpacity>
							<Text style={styles.address}>{promo.address}</Text>
							<View style={[styles.horizontal, styles.allrow]}>
								<Text style={styles.phone}>{promo.phone.toUpperCase()}</Text>
								<TouchableOpacity activeOpacity={1} onPress={() => this.phoneCall(promo.phone)}>
									<Image style={styles.phoneImg} source={require('../assets/images/baseline_phone_black_48dp.png')} />
								</TouchableOpacity>
							</View>
						</View>
						<View>
							<TouchableOpacity activeOpacity={1} style={[styles.horizontal, styles.allrow]} onPress={()=>{this.props.navigation.navigate('ReviewList', {id: promo.id, navigation: this.props.navigation})}}>
								<Text style={styles.title}>Отзывы</Text>
								<Text style={styles.link}>ОТКРЫТЬ ВСЕ</Text>
							</TouchableOpacity>
							{ (promo.rev_quantity > 0) &&
								promo.reviews.map((review, index)=>{ 
									return(
										<Review key={index} data={review} />
									)
								})
							}
							{(promo.rev_quantity == 0) &&
								<View>
									<Text style={styles.empty}>Отзывов еще нет</Text>
								</View>
							}
						</View>
					</View>
					<View style={styles.emptyBlock}></View>
				</ScrollView>
				<Button
					large
					title={(this.state.isBuy) ? 'ПОЛУЧИТЬ ПРОМОКОД' : 'У вас уже есть этот промокод'}
					color='#fff'
					onPress={ this.pressButton }
					buttonStyle={ styles.button } 
					disabled={ this.state.disButton }
				/>
				</View>
				}
				{ this.state.loading &&
					<ActivityIndicator
						color={ Colors.navigationTitle }
						size='large'
						style={styles.ActivityIndicatorStyle}
					/>
            	}
			</View>
        )
	}

	pressButton = () => {
		this.props.onAddBack('Promo');
		this.props.onAddId(this.props.navigation.state.params.id);
		this.props.onAddTitle(this.state.promo.title);
		this.props.navigation.navigate('Login')
	}

	/**
	 * Звонок по клику
	 */
	phoneCall = (phone) => {
		let number = ''; console.log(phone);
		
		if(Platform.OS === 'android'){
			number = 'tel:'+phone;
		} else {
			number = 'telprompt:'+phone;
		}
		Linking.canOpenURL(number)
		.then(supported => {
			if(supported) Linking.openURL(number)
		})
		.catch(err => console.log(err));
	}
	
	/**
	Без этого не просчитывается количество
	*/
	_renderSales(){
		const results = [];
		var sales = this.state.promo.sales;
		var one = false
		for(var i = 0; i < sales.length; i++){
			if(sales[i].count_tickets <= this.state.promo.rec_promo && (sales[i+1])? sales[i+1].count_tickets > this.state.promo.rec_promo : true && one == false){
				one = true;
				results.push(
					<View key={i} style={[styles.horizontal, styles.allrow, styles.saleContainer]}>
						<Text style={[styles.sale, styles.bold]}>{sales[i].count_tickets} - {(sales[i+1]) ? sales[i+1].count_tickets -1 : this.state.promo.tickets} покупок</Text>
						<Text style={[styles.greyColor, styles.bold]}>{sales[i].percent}%</Text>
					</View> 
				)
			}else{ 
				results.push(
					<View key={i}  style={[styles.horizontal, styles.allrow, styles.saleContainer]}>
						<Text style={styles.sale}>{sales[i].count_tickets} - {(sales[i+1]) ? sales[i+1].count_tickets -1 : this.state.promo.tickets} покупок</Text>
						<Text style={styles.greyColor}>{sales[i].percent}%</Text>
					</View>
				)
			}
		}
		return results;
	}

	/*
	Превью текста
	*/
	_textPreview(str){
		str = decodeURI(str);
		if(str.length > 150) return str.substr(0, 150) + "…";
		return str;
	}
	_dateFormat(date){
		var dat = new Date(date.replace(/-/g,"/"));
		return ((dat.getDate()<10) ? "0"+dat.getDate() : dat.getDate())+"."+(((dat.getMonth()+1)<10) ? "0"+(dat.getMonth()+1) : (dat.getMonth()+1))+"."+dat.getFullYear();
	}
	_siteFormat(site){
		if(site.length > 25) return site.substr(0, 25) + "…";
		return site;
	}
	_getDate = dat =>
    {
        if(dat == undefined) return;
        var now = new Date();
        var stop = new Date(dat.replace(/-/g,"/"));

        var duration = stop - now;
        var days = parseInt(duration/(1000*60*60*24)) + 1;

        return days;
    }
}
export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onAddBack: (back) => {
			dispatch({type: 'setBack', value: back})
		},
		onAddId: (id) => {
			dispatch({type: 'setId', value: id})
		},
		onAddTitle: (title) => {
			dispatch({type: 'setTitle', value: title})
		},
		onAddRPromo: (ref) => {
			dispatch({type: 'setRPromo', value: ref})
		}
	})
)(PromoScreen)

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imgRow: {
		width: 24,
		height: 24,
	},
	textRow: {
        color: '#000',
        opacity: 0.54,
        paddingLeft: 4,
		paddingRight: 6,
		fontFamily: 'roboto',
		fontSize: 16.
	},
	descRow: {
		fontFamily: 'roboto',
		fontSize: 12,
		opacity: 0.54,
		color: '#000',
		paddingTop: 6
	},
	horizontal: {
        flexDirection: 'row',
	},
	allrow: {
		justifyContent: 'space-between',
	},
	container: {
		paddingHorizontal: 5,
		paddingTop: 5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 5,
	},
	image: {
        width: Dimensions.get('window').width,
		minHeight: Dimensions.get('window').width  / 1.766,
		paddingTop: 10,
	},
	title: {
		marginTop: 10,
		marginBottom: 5,
		fontSize: 20,
		fontFamily: 'roboto-medium',
	},
	link: {
		marginTop: 12,
		marginBottom: 5,
		color: '#0097A7',
		fontFamily: 'roboto-medium',
		fontSize: 14
	},
	map: {
		height: 170,
		marginTop: 5,
	},
	greyColor: {
		color: '#000',
		opacity: 0.5,
		fontFamily: 'roboto'
	},
	greybottomline: {
		borderColor: '#949494',
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 5,
		paddingBottom: 10,
	},
	titlelabel: {
        backgroundColor: '#1E88E5',
	},
	mTop: {
		marginTop: 20,
	},
	address: {
		marginTop: 12,
	},
	block: {
		marginBottom: 8,
	},
	empty: {
		textAlign: 'center',
		marginBottom: 20,
		marginTop: 15,
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
	button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
		marginBottom: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	emptyBlock: {
		height: 100,
	},
	textcenter: {
		textAlign: 'center'
	},
	rowContainer: {
		paddingTop: 12,
		paddingBottom: 12
	},
	sale: {
		fontFamily: 'roboto',
		fontSize: 16,
		color: '#000'
	},
	bold: {
		fontWeight: 'bold',
		fontFamily: 'roboto-bold'
	},
	saleContainer: {
		paddingVertical: 8,
		paddingHorizontal: 10
	},
	padHorizon: {
		paddingHorizontal: 10
	},
	phone: {
		fontFamily: 'roboto',
		fontSize: 16,
		opacity: 0.5,
		color: '#000',
		alignSelf: 'center'
	},
	phoneImg: {
		width: 36,
		height: 36,
		marginHorizontal: 15,
		marginVertical: 5
	}
});