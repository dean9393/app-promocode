import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
} from 'react-native';
import { Avatar } from 'react-native-elements';

export default class Review extends React.Component
{
    constructor(props)
    {
        super(props);
    }

//
// Render...
//

    render()
    {
		if('item' in this.props.data){
			var review = this.props.data.item;
		}
		else{
			var review = this.props.data;
		}
	var check = false;
    return(
        <View style={styles.pad}>
			<View style={ [styles.horizontal, styles.container] }>
				<View style={ styles.avatarContainer }>
					{(review.avatar != null) &&
						<Avatar
						medium
						rounded
						source={{ uri:'http://promocodehealth.ru/public/storage/' +review.avatar }}
						activeOpacity={ 0.7 } />
					}
					{(review.avatar == null && (review.first_name != null || review.second_name != null)) &&
						<Avatar
						medium
						rounded
						title={(review.first_name != null)? review.first_name.substr(0,1): '' + (review.second_name != null)? review.second_name.substr(0,1): ''}
						activeOpacity={ 0.7 }
						titleStyle={{color:'#85C8DE'}} />
					}
					{(review.avatar == null && review.first_name == null && review.second_name == null) &&
						<Avatar
						medium
						rounded
						source={require('../assets/images/user_icon_stock1.png')}
						activeOpacity={ 0.7 } />
					}
				</View>
				<View style={ styles.grow }>
					<View>
						<Text style={ styles.name }>{ (review.first_name != null)? review.first_name : ''+' '+ (review.second_name != null)? review.second_name : '' }</Text>
						<Text style={ styles.date }>{ this._dateFormat(review.created_at) }</Text>
					</View>
				</View>
			</View>
			<View style={ styles.block }>
				<Text style={ styles.title }>Что понравилось?</Text>
				<Text style={ styles.text }>{ review.positive }</Text>
				<Text style={ styles.title }>Что не понравилось?</Text>
				<Text style={ styles.text }>{ review.negative }</Text>
			</View>
		</View>
	)}
	
	_dateFormat(date){
		var dat = new Date(date.replace(/-/g,"/"));
		return ((dat.getDate()<10) ? "0"+dat.getDate() : dat.getDate())+"."+(((dat.getMonth()+1)<10) ? "0"+(dat.getMonth()+1) : (dat.getMonth()+1))+"."+dat.getFullYear();
	}
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: 'row',
	},
	container: {
		flex: 1,	
	},
	avatarContainer: {
		paddingRight: 15,
	},
	grow: {
		flexGrow: 1,
	},
	date: {
		color: '#000',
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 14,
		fontFamily: 'roboto-medium',
		opacity: 0.54
	},
	name: {
		fontSize: 14,
		fontFamily: 'roboto-medium',
		opacity: 0.87
	},
	block: {
		paddingTop: 5,
	},
	title: {
		color: '#000',
		paddingTop: 10,
		paddingBottom: 10,
		fontSize: 14,
		fontFamily: 'roboto-medium',
		opacity: 0.54
	},
	text: {
		color: '#000',
		fontSize: 14,
		fontFamily: 'roboto'
	},
	pad: {
		paddingHorizontal: 18,
		paddingVertical: 10,
	}
})