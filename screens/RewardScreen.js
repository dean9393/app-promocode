import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import {connect} from 'react-redux';

class RewardScreen extends React.Component
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

    render()
    {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.back} activeOpacity={1} onPress={()=>{
                    if(this.props.store.back == 'Promo'){
                        this.props.onAddPromoRefresh(true);
                    } else if(this.props.store.back == 'CreateReview'){
                        this.props.onAddReviewRefresh(true);
                    }
                    this.props.navigation.navigate(this.props.store.back);
                }}>
                    <Text style={styles.close}>Закрыть</Text>
                </TouchableOpacity>
                {(this.props.store.back !== 'Promo') &&
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{width: 72, height: 63,}}>
                                <Image style={styles.img2} source={require('../assets/images/rewardmens.png')} />
                            </View>
                        </View>
                        <Text style={styles.text1}>Теперь вы наш клиент</Text>
                        <Text style={styles.text2}>После прохождения регистрации вы стали нашим пользователем! Так же вы можете заполнить свой профиль, для более комфортного использования нашего приложения.</Text>
                    </View>
                }
                {(this.props.store.back === 'Promo') &&
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={{width: 72, height: 72,}}>
                                <Image style={styles.img} source={require('../assets/images/rewardtiket.png')} />
                            </View>
                        </View>
                        {(this.status == 2) &&
                            <View>
                                <Text style={styles.text1}>Ваш промокод получен!</Text>
                                <Text style={styles.text1}>{this.promocode}</Text>
                                <Text style={styles.text2}>Спасибо за проявленный интерес к нашему сервису! Каждый раз мы будем создавать для вас новые и новые акции! Увидить свои промокоды вы можете в личном кабинете.</Text>
                            </View>
                        }
                        {(this.status == 1) &&
                            <View>
                                <Text style={styles.text3}>Вы уже участвовали в этой акции</Text>
                            </View>
                        }
                        { (this.status == 0) &&
                            <View>
                                <Text style={styles.text3}>Промокоды только что закончились...</Text>
                            </View>
                        }
                    </View>
                }
            </View>
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
)(RewardScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#85C8DE',
        padding: 15,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text1:{
        fontSize: 20,
        marginTop: 15,
        textAlign: 'center',
        fontFamily: 'roboto-medium',
        color: '#fff',
    },
    text2:{
        fontSize: 16,
        marginTop: 15,
        textAlign: 'left',
        fontFamily: 'roboto',
        color: '#fff',
    },
    text3:{
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
    img: {
        width: 72,
        height: 72,
    },
    img2: {
        width: 72,
        height: 63,
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
})