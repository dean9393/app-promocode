import React from 'react';
import { 
	View,
    StyleSheet,
    WebView,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';

class InfoMapScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    ActivityIndicatorLoadingView() {
        return (
            <ActivityIndicator
                color='#1E88E5'
                size='large'
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    render()
    {
        return(
            <View style={styles.container}>
                <WebView 
                    source={{uri:'https://promocodehealth.ru/public/onemap/'+this.props.navigation.state.params.id}} 
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView} 
                    startInLoadingState={true}  
                    style={styles.map} />
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
)(InfoMapScreen)

const styles = StyleSheet.create({
    map: {
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
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
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
		marginBottom: 20,
		position: 'absolute',
		bottom: 0,
		left: 0,
        right: 0,
    },
})