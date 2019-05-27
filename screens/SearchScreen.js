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
import SearchBar from 'react-native-search-bar';

class SearchScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            promotions: null,
            page: 0,
            empty: false,
            search: ''
        }
    }

    dataLoad = () => {
        if(this.state.search != null)
		setTimeout(()=>{
		fetch('https://promocodehealth.ru/public/api/search', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				city: this.props.store.city_id,
                page: this.state.page,
                search: this.state.search
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
			  	<SearchBar
					ref='searchBar'
					placeholder='Поиск...'
					onChangeText={(search) => {this.setState({search: search})}}
					onSearchButtonPress={this.dataLoad}
					onCancelButtonPress={() => {this.setState({search: ''})}}
				/>
            {!this.state.empty &&
                <View>
				<FlatList
					style={ styles.scrollview }
					data={ this.state.promotions }
					renderItem={(promo) => (
						<Promo data={ promo } />
					)}
					keyExtractor={promo => promo.id.toString()}
                    ListFooterComponent={ this.renderFooter }
                    ListHeaderComponent={ this.renderHeader }
					onEndReached={ this.dataLoad }
					onEndReachedThreshold={0.5}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.flatlist}
					loading={true}
				/>
                </View>
			}
			{this.state.empty &&
				<View style={styles.headerText}>
				  	<Text style={{textAlign: 'center', fontSize: 20 }}>Действующих акций не найдено</Text>
				</View>
			}
			</View>
		)
    }
    
    renderFooter = () => {
		return (
			this.state.loading &&
			<View
				style={(this.state.promotions) ? styles.loader : styles.centerLoader}
			>
				<ActivityIndicator size={ 50 } color={ Colors.navigationTitle } />
			</View>
		)
    }

    updateSearch = search => {
        this.setState({ search })
    }
}
export default connect(
	state => ({
	  	store: state
	}),
)(SearchScreen);

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