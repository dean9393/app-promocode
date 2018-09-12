import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { withNavigation } from 'react-navigation';

class Promo extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const promo = this.props.data;

        return(
            <View key={ promo.id } style={styles.container}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Promo', {id:promo.id, title:promo.title})} } >
                <View>
                    <View style={styles.horizontalBlock} >
                        <Text style={[styles.whiteBlock, styles.white]}>- { promo.sale }%</Text>
                        <View style={[styles.horizontal, styles.whiteBlock]}>
                            <Text  style={styles.white} >{ promo.tickets - promo.rec_promo } </Text>
                            <TabBarIcon custom={true} style={{ marginLeft: 5, marginBottom: 0, }} name={'tags'} font={'FontAwesome'} size={25} />
                        </View>
                    </View>
                    <Image style={styles.image} source={{ uri: 'http://promocodehealth.ru/public/storage/' + promo.img }} />
                    <Text style={styles.date_block}>Осталось { this._getDate(promo.date_end) }</Text>
                </View>
                <Text style={styles.title}>{ promo.title }</Text>
                <View style={[styles.horizontal, styles.right_align]}>
                    <Text style={styles.old_price}>{ promo.price }₽</Text>
                    <Text>{ promo.price * ((100 - promo.sale) / 100) }₽</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }

    _getDate(dat)
    {
        var now = new Date();
        var stop = new Date(dat.replace(/-/g,"/"));

        var duration = stop - now;
        var minutes = parseInt((duration/(1000*60))%60);
        var hours = parseInt((duration/(1000*60*60))%24);
        var days = parseInt(duration/(1000*60*60*24));

        var day = days % 10;
        var day_str = (day == 1) ? 'день' : (day > 1 && day < 5) ? 'дня' : 'дней';

        var hour_str = (hours == 1 || hours == 21) ? 'час' : ((hours > 1 && hours < 5) || hours > 21 ) ? 'часа' : 'часов';

        var min = minutes % 10;
        var min_str = (minutes > 10 && minutes < 15) ? 'минут' : (min == 1) ? 'минута' : (min > 1 && min < 5) ? 'минуты' : 'минут';

        str = days +' ' + day_str + ' ' + hours + ' ' + hour_str + ' ' + minutes + ' ' + min_str;
        return str;
    }
}

export default withNavigation(Promo)

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width - 10,
        minHeight: (Dimensions.get('window').width - 10) / 1.766,
        marginTop: -60,
    },
    horizontalBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.6)',
    },
    horizontal: {
        flexDirection: 'row',
    },
    whiteBlock: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    white: {
        color: '#000',
        fontSize: 18,
    },
    padleft: {
        marginLeft: 5,
    },
    title: {
        margin: 5,
    },
    container: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowRadius: 5,
    },
    old_price: {
        textDecorationLine: 'line-through',
        color: '#c0c0c0',
        paddingRight: 10,
    },
    right_align: {
        justifyContent: 'flex-end',
        marginRight: 5,
    },
    date_block: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginTop: -27,
        padding: 5,
        zIndex: 10,
    }
})