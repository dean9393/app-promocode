import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { withNavigation } from 'react-navigation';
import { BoxShadow } from 'react-native-shadow';
import  Slider  from '../components/Slider';

class Promo extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const promo = this.props.data.item;
        //console.log(promo);
        const imgs = [];
        let url = 'https://promocodehealth.ru/public/storage/';

        (promo.img1) ? imgs.push(url + promo.img1) : '';
        (promo.img2) ? imgs.push(url + promo.img2) : '';
        (promo.img3) ? imgs.push(url + promo.img3) : '';

        return(
        <View style={ styles.container }>
            <TouchableOpacity activeOpacity={1} onPress={ () => {this.props.navigation.navigate('Promo', {id:promo.id, title:promo.title})} }>
                <View>
                    { (imgs.length == 1) &&
                        <Image 
                            source={{uri: imgs[0]}} 
                            style={{width: Dimensions.get('window').width - 16, height: (Dimensions.get('window').width - 16) / 1.766 }} />
                    }
                    {(imgs.length > 1) &&
                        <Slider 
                        images={ imgs }
                        w={ Dimensions.get('window').width - 16 }
                        h={ (Dimensions.get('window').width - 16) / 1.766 }
                        r={0}
                        isScroll={false} />
                    }
                </View>
                <View style={[ styles.horizontal, styles.rowContainer ]}>
                    <Image style={ styles.imgRow } source={require('../assets/images/percent.png')} />
                    <Text style={ styles.textRow }> { (promo.sale != []) ? promo.sale : 0 }</Text>
                    <Image style={ styles.imgRow } source={require('../assets/images/baseline_access_time_black_24dp.png')} />
                    <Text style={ styles.textRow }>{ this._getDate(promo.date_end) }</Text>
                    <Image style={ styles.imgRow } source={require('../assets/images/baseline_message_black_24dp.png')} />
                    <Text style={ styles.textRow }>{ promo.count_review }</Text>
                    <Image style={ styles.imgRow } source={require('../assets/images/baseline_loyalty_black_48dp.png')} />
                    <Text style={ styles.textRow }>{ promo.tickets - promo.rec_promo }</Text>
                    <Image style={ styles.imgRow } source={require('../assets/images/roub.png')} />
                    <Text style={ styles.textRow }>{ promo.price * ((100 - promo.sale) / 100) }</Text>
                </View>
                <Text style={ styles.title }>{ promo.title }</Text>
            </TouchableOpacity>
        </View>
        )
    }

    _getDate = dat =>
    {
        if(dat == undefined) return;
        var now = new Date();
        var stop = new Date(dat.replace(/-/g,"/"));

        var duration = stop - now;
        /*var minutes = parseInt((duration/(1000*60))%60);
        var hours = parseInt((duration/(1000*60*60))%24);*/
        var days = parseInt(duration/(1000*60*60*24)) + 1;

        //str = days +'д. ' + hours + 'ч. ' + minutes + 'м.';
        return days;
    }
}

export default withNavigation(Promo)

const styles = StyleSheet.create({
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        margin: 8,
        fontSize: 14,
        fontFamily: 'roboto',
        textAlign: 'justify',
        color: '#000',
        opacity: 0.87
    },
    container: {
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: '#fff',
        position: 'relative',
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.4)',
    },
    imgRow: {
        width: 25,
        height: 25,
    },
    textRow: {
        color: '#000',
        opacity: 0.54,
        paddingTop: 2,
        paddingLeft: 4,
        paddingRight: 6,
    },
    rowContainer: {
        paddingTop: 12
    }
})