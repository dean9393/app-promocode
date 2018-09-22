import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	Dimensions, 
	TouchableOpacity,
	WebView,
	Linking,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'expo';
import Review from '../components/Review';
import HTML from 'react-native-render-html';
import Slider from '../components/Slider';
import { withNavigation } from 'react-navigation';


class PromoScreen extends React.Component {

  	constructor(props)
  	{
    	super(props);
    	this.state={
			isLoad: false,
    	}
	}

	static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
	});
	
    componentDidMount() {
		/*var res = this.props.navigation.state.params.id;
      	fetch('http://promocodehealth.ru/public/api/promo/'+res)
      	.then((response) => response.json())
      	.then((responseJson) => {
        	this.setState({
              	promo: responseJson,
              	isLoad: true
            });
        })
        .catch((error) =>{
            console.error('promo: '+error);
        })*/

       	this.setState({
          promo: require('../components/Promo.json'),
          isLoad: true,
		})
		
    }

    render()
    {
		const promo = this.state.promo;

		const imgs = [];
        let url = 'http://promocodehealth.ru/public/storage/';

		if( this.state.isLoad ) {
        	(promo.img1) ? imgs.push(url + promo.img1) : '';
        	(promo.img2) ? imgs.push(url + promo.img2) : '';
			(promo.img3) ? imgs.push(url + promo.img3) : '';
		}

        return(
            <View style={styles.body}>
				{ this.state.isLoad && 
				<ScrollView>
					<Slider 
                    images={ imgs }
                    // radius
                    r={ 0 }
                    // widrh
                    w={ Dimensions.get('window').width }
                    // height
                    h={ Dimensions.get('window').width  / 1.766 } />
					<View style={styles.container}>
						<Text style={styles.title}>{promo.title}</Text>
						<View style={[styles.horizontal, styles.allrow, styles.block, styles.mTop]}>
							<View>
								<Text style={[styles.toptoken, styles.greyColor]}>{promo.sale}%</Text>
								<Text style={styles.greyColor}>СКИДКА</Text>
							</View>
							<View>
								<Text style={[styles.toptoken, styles.greyColor]}>{promo.price * (promo.sale / 100)}₽</Text>
								<Text style={styles.greyColor}>ЭКОНОМИЯ</Text>
							</View>
							<View>
								<Text style={[styles.toptoken, styles.blueColor]}>{promo.tickets - promo.rec_promo} <Icon.FontAwesome
        								name={'tags'}
        								size={26}
        								color={'#1E88E5'} />
								</Text>
								<Text style={styles.blueColor}>ОСТАЛОСЬ</Text>
							</View>
						</View>
						{ promo.sales &&
						<View style={styles.mBottom}>
							<Text style={styles.title}>Скидка</Text>
							{ this._renderTicketsItems() }
						</View>
						}
						<TouchableOpacity style={styles.block} onPress={()=>{this.props.navigation.navigate('Info', {title:'Условия', text:promo.conditions})}}>
							<View>
								<View style={[styles.horizontal, styles.allrow]}>
									<Text style={styles.title}>Условия</Text>
									<Text style={styles.link}>Детали</Text>
								</View>
								<HTML html={this._textPreview(promo.conditions)} />
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.block} onPress={()=>{this.props.navigation.navigate('Info', {title:'Описание', text:promo.description})}}>
							<View>
								<View style={[styles.horizontal, styles.allrow]}>
									<Text style={styles.title}>Описание</Text>
									<Text style={styles.link}>Детали</Text>
								</View>
								<HTML html={this._textPreview(promo.description)} />
							</View>
						</TouchableOpacity>
						<View style={styles.blockClear}>
							<TouchableOpacity onPress={ ()=>{ Linking.openURL(promo.site)} }>
								<View style={[styles.horizontal, styles.allrow]}>
									<Text style={styles.title}>Инфо</Text>
									<Text style={styles.link}>{this._siteFormat(promo.site)}</Text>
								</View>
							</TouchableOpacity>
							<View style={[styles.horizontal, styles.allrow, styles.greybottomline]}>
								<Text style={styles.greyColor}>Начало акции</Text>
								<Text>{this._dateFormat(promo.date_start)}</Text>
							</View>
							<View style={[styles.horizontal, styles.allrow, styles.greybottomline]}>
								<Text style={styles.greyColor}>Конец акции</Text>
								<Text>{this._dateFormat(promo.date_end)}</Text>
							</View>
							<View style={[styles.horizontal, styles.allrow, styles.greybottomline]}>
								<Text style={styles.greyColor}>Телефон</Text>
								<Text>{promo.phone}</Text>
							</View>
						</View>
						<TouchableOpacity style={styles.block} onPress={()=>{this.props.navigation.navigate('InfoMap', {coord: promo.coordinates, title: promo.title})}}>
							<View style={[styles.horizontal, styles.allrow]}>
								<Text style={styles.title}>На карте</Text>
								<Text style={styles.link}>Открыть</Text>
							</View>
							<WebView source={{uri:'http://promocodehealth.ru/public/onemap/'+promo.coordinates+'/'+promo.title + '/15'}} style={styles.map} />
							<Text style={styles.address}>{promo.address}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{this.props.navigation.navigate('ReviewList', {id: promo.id, navigation: this.props.navigation})}}>
							<View style={[styles.horizontal, styles.allrow]}>
								<Text style={styles.title}>Отзывы <Text style={styles.countReview}>{promo.rev_quantity}</Text></Text>
								<Text style={styles.link}>Все отзывы</Text>
							</View>
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
						</TouchableOpacity>
					</View>
				</ScrollView>
				}
			</View>
        )
	}
	
	/*
	Без этого не просчитывается количество
	*/
	_renderTicketsItems(){
		const results = [];
		var sales = this.state.promo.sales;
		for(var i = 0; i < sales.length; i++){
		  results.push(
			<View key={i}  style={[styles.horizontal, styles.allrow, styles.greybottomline]}>
				<Text style={styles.greyColor}>{sales[i].count_tickets + 1} - {(sales[i+1]) ? sales[i+1].count_tickets : this.state.promo.tickets}</Text>
				<Text>{sales[i].percent}%</Text>
			</View>
		  );
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
}
export default withNavigation(PromoScreen)

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: '#fff',
	},
	horizontal: {
        flexDirection: 'row',
	},
	allrow: {
		justifyContent: 'space-between',
	},
	container: {
		paddingHorizontal: 10,
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
		marginTop: 8,
		marginBottom: 5,
		fontWeight: 'bold',
		fontSize: 18,
		fontFamily: 'roboto',
	},
	link: {
		marginTop: 12,
		marginBottom: 5,
		color: '#0066CC',
	},
	map: {
		height: 170,
		marginTop: 5,
	},
	toptoken: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	greyColor: {
		color: '#777777',
	},
	blueColor: {
		color: '#1E88E5',
		//color: '#20B1D8'
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
	mBottom: {
		marginBottom: 20,
	},
	mTop: {
		marginTop: 20,
	},
	address: {
		marginTop: 12,
	},
	countReview: {
		color:'#ccc', 
		marginLeft: 5
	},
	block: {
		borderColor: '#949494',
		borderBottomWidth: 1,
		paddingBottom: 30,
		marginBottom: 22,
	},
	blockClear: {
		marginBottom: 20,
	},
	empty: {
		textAlign: 'center',
		marginBottom: 20,
		marginTop: 15,
	}
});