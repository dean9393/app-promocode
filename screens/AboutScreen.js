import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';

class About extends React.Component {
    
    constructor(props)
    {
        super(props)
    }

    render(){
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <Text style={styles.text}>Когда-нибудь здесь появится история создания проекта, а пока мне лень придумывать... жизнь тлен... а дедлайны реальны</Text>
                    <Text style={styles.text2}>(｡╯︵╰｡)</Text>
                </View>
            </SafeAreaView>
        )
    }
}
export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
		onAddBack: (back) => {
			dispatch({type: 'setBack', value: back})
        }
    })
)(About);

const styles = StyleSheet.create({
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 15,
    },
    text: {
        fontSize: 16,
    },
    text2: {
        textAlign: 'center',
        paddingTop: 15,
        fontSize: 16,
    },
})