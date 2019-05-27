import React from 'react';
import {
    View,
    AsyncStorage,
    Dimensions,
    StyleSheet,
    WebView,
    ActivityIndicator
} from 'react-native';

export default class MapScreen extends React.Component {

    constructor(props)
    {
        super(props);
        
        this.state={
            isLoading: false
        }
    }

    static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.title,
	});

    componentDidMount()
    {
        this.setState({
            isLoading: true,
        })
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

    render(){
        return (
            <View style={styles.container}>
                {this.state.isLoading &&
                <WebView 
                    source={{uri:'https://promocodehealth.ru/public/allmap/' + this.props.navigation.state.params.city+'/'+this.props.navigation.state.params.cat+'/'+this.props.navigation.state.params.subcat}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView} 
                    startInLoadingState={true}  
                    style={styles.map} />
                }
            </View>
        )
    }
}

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
    }
})