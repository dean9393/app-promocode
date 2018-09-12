import React from 'react';
import {
    View,
    AsyncStorage,
    Dimensions
} from 'react-native';

export default class MapScreen extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            id: 1
        }
    }

    componentDidMount()
    {
        try {
            this.setState({
                id: await AsyncStorage.getItem('city_id'),
            })
        } catch(error){
            console.log('check city_id on map: '+error);
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <WebView source={{uri:'http://promocodehealth.ru/public/allmap/' + this.state.id}} style={styles.map} />
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