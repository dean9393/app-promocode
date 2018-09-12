import React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
} from 'react-native';
import {Avatar} from 'react-native-elements';
import { Icon } from 'expo';

export default class Comment extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const review = this.props.data;
    return(
        <View style={[styles.horizontal, styles.container]}>
			<View style={styles.avatarContainer}>
				<Avatar
					medium
					rounded
					source={{uri:'http://promocodehealth.ru/public/storage/' +review.avatar}}
					activeOpacity={0.7} />
			</View>
			<View style={styles.grow}>
				<View style={[styles.horizontal, styles.allrow]}>
					<View>
						<Text style={styles.name}>{review.name}</Text>
						<Text style={styles.date}>{this._dateFormat(review.created_at)}</Text>
					</View>
					<View>
                        <Icon.FontAwesome
        					name={(review.status) ? 'plus' : 'minus'}
        					size={26}
        					color={'#000'} />
					</View>
				</View>
			    <View style={styles.block}>
					<Text style={styles.title}>Понравилось</Text>
					<Text>{review.positive}</Text>
					<Text style={styles.title}>Не понравилось</Text>
					<Text>{review.negative}</Text>
				</View>
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
		paddingTop: 10,
		paddingBottom: 10,
		borderColor: '#949494',
		borderBottomWidth: 1,
		marginTop: 15,
	},
	avatarContainer: {
		paddingRight: 15,
	},
	allrow: {
		justifyContent: 'space-between',
	},
	grow: {
		flexGrow: 1,
	},
	date: {
		color: '#ccc',
		paddingTop: 5,
		paddingBottom: 5,
	},
	name: {
		fontSize: 16,
	},
	block: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	title: {
		color: '#ccc',
		paddingTop: 5,
		paddingBottom: 5,
	}
})