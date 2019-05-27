import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';
import {connect} from 'react-redux';

class RewardSupportScreen extends React.Component
{
    constructor(props)
    {
        super(props)

        if(this.props.store.back == 'Promo'){
            this.promocode = this.props.navigation.state.params.promocode
            this.status = this.props.navigation.state.params.status
        }
    }

    static navigationOptions = {
        header: null
    }

    render(){
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.back} activeOpacity={1} onPress={()=>{
                        this.props.navigation.navigate(this.props.store.back);
                    }}>
                        <Text style={styles.close}>Закрыть</Text>
                    </TouchableOpacity>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{width: 96, height: 96,}}>
                                <Image style={styles.img} source={require('../assets/images/white_question.png')} />
                            </View>
                        </View>
                        <Text style={styles.text1}>Ваше письмо отправлено!</Text>
                        <Text style={styles.text2}>Спасибо за ваше обращение. Мы получили ваше письмо и уже начали готовить ответ.</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
export default connect(state => ({
    store: state
}),
dispatch => ({
    onAddPromoRefresh: (ref) => (
        dispatch({type: 'setRPromo', value: ref}),
        dispatch({type: 'setRHome', value: ref})
    ),
    onAddReviewRefresh: (ref) => {
        dispatch({type: 'setRPromo', value: ref}),
        dispatch({type: 'setRReview', value: ref})
    }
})
)(RewardSupportScreen)

const styles = StyleSheet.create({
    areaContainer: {
        flex: 1,
        backgroundColor: '#85C8DE',
    },
    container: {
        flex: 1,
        padding: 15,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    close: {
        color: '#fff',
        fontFamily: 'roboto-medium',
        fontSize: 14,
    },
    back: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingTop: 35,
        paddingHorizontal: 15,
    },
    img: {
        width: 96,
        height: 96,
    },
    text1: {
        color: '#fff',
        fontFamily: 'roboto-medium',
        fontSize: 20,
        paddingVertical: 20,
        textAlign: 'center',
    },
    text2: {
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 15,
    }
})