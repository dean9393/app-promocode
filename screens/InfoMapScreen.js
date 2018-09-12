import React from 'react';
import { 
	View,
    StyleSheet,
    WebView,
    Dimensions,
} from 'react-native';

export default class InfoMapScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const info = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <WebView source={{uri:'http://promocodehealth.ru/public/onemap/'+info.coord+'/'+info.title}} style={styles.map} />
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
    }
})