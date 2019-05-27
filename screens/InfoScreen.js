import React from 'react';
import { 
	View,
	ScrollView,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';
import HTML from 'react-native-render-html';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

class InfoScreen extends React.Component {

    constructor(props)
    {
      super(props);
    }

    render()
    {
        const text = this.props.navigation.state.params.text;
        return(
            <View style={styles.container}>
                <ScrollView>
                    <HTML html={text} />
                    <View style={styles.empty}></View>
                </ScrollView>
                <Button
					large
					title={(this.props.navigation.state.params.isBuy) ? 'ПОЛУЧИТЬ ПРОМОКОД' : 'У вас уже есть этот промокод'}
					color='#fff'
					onPress={ this.pressButton }
					buttonStyle={ styles.button } 
					disabled={ this.props.navigation.state.params.disButton }
				/>
            </View>
        )
    }

    pressButton = () => {
        this.props.onAddBack('Promo');
		this.props.onAddId(this.props.navigation.state.params.id);
		this.props.onAddTitle(this.props.navigation.state.params.title);
        this.props.navigation.navigate('Login')
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
		}
	})
)(InfoScreen)

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginVertical: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
        right: 0,
    },
    empty: {
        height: 90,
        width: '100%',
    }
})