import React from 'react';
import { 
	View,
    StyleSheet,
    WebView,
    Dimensions,
    ActivityIndicator
} from 'react-native';

export default class InfoMapScreen extends React.Component
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
        const info = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <WebView 
                    source={{uri:'http://promocodehealth.ru/public/onemap/'+info.coord+'/'+info.title+'/10'}} 
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView} 
                    startInLoadingState={true}  
                    style={styles.map} />
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