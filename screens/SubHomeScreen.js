import React from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	FlatList,
	Dimensions,
	Text,
	TouchableOpacity ,
	Image
} from 'react-native';
import Promo from '../components/Promo';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import Tabs from '../components/Tabs';

class SubHomeScreen extends React.Component {
  	constructor(props){
		super(props)
		this.state = {
			loading: true,
			promotions: null,
			cat: this.props.navigation.state.params.cat,
			subcat: 0,
			page: 0,
			empty: false,
			routes: [{key: 0, title: 'Все акции', id: 0}]
		}
  	}

  	componentDidMount() { 
		let m = Array();
		m.push({key: 0, title: 'Все акции', id: 0});
		this.props.store.subcategory.map((track, index) => {
			if(track.category_id == this.state.cat){
				const key = {key: track.id, title: track.title, id: track.id};
				m.push(key);
			}
		});

		this.setState({
			routes: m
		});
		
		this.dataLoad();

		/*this.setState({
			promotions: require('../components/PromoList.json'),
			loading: false,
		}) */
  	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
	});

	dataLoad = () => {
		setTimeout(()=>{
		fetch('https://promocodehealth.ru/public/api/promolist', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				city: this.props.store.city_id,
				cat: this.state.cat,
				subcat: this.state.subcat,
				page: this.state.page
			}),
		}).then((response) => response.json())
		.then((response) => {
			console.log(response);
			if(response == false) {
				if(this.state.promotions == null){
					this.setState({
						loading:false,
						empty: true,
					})
				} else {
					this.setState({
						loading: false,
						promotions: this.state.promotions.concat([])
					})
				}
			}
			if(Array.isArray(response))
				if(this.state.promotions == null){
					this.setState({
						promotions: response,
						page: this.state.page + 1
					})
				} else {
					this.setState({
						promotions: this.state.promotions.concat(response),
						page: this.state.page + 1
					})
				}
		})
		.catch((error) => {
		  console.error(error);
		});
		}, 1500)
	}

	render() { 
		return (
		  	<View style={ styles.container }>
			{(this.state.promotions != null) &&
				<TouchableOpacity 
					activeOpacity={1}
					style={styles.floatbuttonContainer}
					onPress={()=>{this.props.navigation.navigate('Map', {title: this.props.navigation.state.params.title, city: this.props.store.city_id, cat: this.state.cat, subcat: this.state.subcat})}}
				>
					<Image source={require('../assets/images/baseline_add_location_white_48dp.png')} style={styles.floatbuttonImg} />
				</TouchableOpacity>
			}
			<Tabs 
				tabs={this.state.routes} 
				callback={(index) => {
					this.setState({
						subcat: index,
						promotions: null,
						page: 0,
						loading: true,
						empty: false,
					}, () => {
						this.dataLoad();
					})
					}
			  	}
			/>
			{!this.state.empty &&
				<FlatList
					style={ styles.scrollview }
					data={ this.state.promotions }
					renderItem={(promo) => (
						<Promo data={ promo } />
					)}
					keyExtractor={promo => promo.id.toString()}
					ListFooterComponent={ this.renderFooter }
					onEndReached={ this.dataLoad }
					onEndReachedThreshold={0.5}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.flatlist}
					loading={true}
				/>
			}
			{this.state.empty &&
				<View style={styles.headerText}>
				  	<Text style={{textAlign: 'center', fontSize: 20 }}>Действующих акций нет</Text>
				</View>
			}
			</View>
		);
	}

	renderFooter = () => {
		return (
			this.state.loading &&
			<View
				style={(this.state.promotions) ? styles.loader : styles.centerLoader}
			>
				<ActivityIndicator size={ 50 } color={ Colors.navigationTitle } />
			</View>
		);
	};
}
export default connect(
	state => ({
	  	store: state
	}),
)(SubHomeScreen);

const styles = StyleSheet.create({
	floatbuttonImg: {
		width: 24,
		height: 24
	},
	floatbuttonContainer: {
		zIndex: 5,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 40,
		right: 20,
		backgroundColor: '#85C8DE',
		width: 56,
		height: 56,
		borderRadius: 28
	},
	loader: {
	  	paddingVertical: 15,
	},
	centerLoader: {
		padding: 10,
		marginTop: (Dimensions.get('window').height / 2) - 80,
	},
	scrollview: {
		paddingVertical: 8,
		paddingHorizontal: 8,
	},
	container: {
	  	flex: 1,
	},
	headerText: {
		padding: 10,
		marginTop: (Dimensions.get('window').height / 2) - 80,
		height: 40,
	},
	flatlist: {
	  	paddingBottom: 10
	}
});