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
        const promo = this.props.data;

        const shadowOpt = {
			width:55,
			height:40,
			color:"#000",
			border:0,
			radius:8,
			opacity:0.2,
			x:1,
			y:2,
			style:{marginVertical:1}
        }
        
        const imgs = [];
        let url = 'http://promocodehealth.ru/public/storage/';

        (promo.img1) ? imgs.push(url + promo.img1) : '';
        (promo.img2) ? imgs.push(url + promo.img2) : '';
        (promo.img3) ? imgs.push(url + promo.img3) : '';

        return(
            <View style={ styles.container }>
            <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Promo', {id:promo.id, title:promo.title})} }>
                <View>
                    <View style={ styles.saleBlock } >
                        <BoxShadow setting={ shadowOpt }>
                            <Text style={ styles.sale }>- { promo.sale }%</Text>
                        </BoxShadow>
                    </View>
                    <Slider 
                    images={ imgs } 
                    r={ 5 }
                    w={ Dimensions.get('window').width - 40 }
                    h={ (Dimensions.get('window').width - 40) / 1.766 } />
                </View>
                <Text style={ styles.title }>{ promo.title }</Text>
                <View style={ styles.horizontal }>
                    <Text style={ styles.italic}>{ this._getDate(promo.date_end) } </Text>
                    <Text style={ styles.italic}>{ promo.tickets - promo.rec_promo }</Text>
                    <TabBarIcon custom={ true } style={{ marginLeft: 1, marginBottom: 0, }} name={'tags'} font={'FontAwesome'} size={15} />
                    <Text style={ styles.italic}>  { promo.price * ((100 - promo.sale) / 100) }₽</Text>
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

        str = days +'д. ' + hours + 'ч. ' + minutes + 'м.';
        return str;
    }
}

export default withNavigation(Promo)

const styles = StyleSheet.create({
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    saleBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        zIndex: 10,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sale: {
        backgroundColor: 'rgb(246,132,106)',
        color: '#fff',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        padding: 10,
        fontFamily: 'roboto',
        minWidth: 50,
        textAlign: 'center',
    },
    title: {
        margin: 20,
        fontSize: 16,
        fontFamily: 'roboto',
        textAlign: 'justify',
    },
    container: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        position: 'relative',
        paddingBottom: 20,
        borderRadius: 5,
    },
    italic: {
        fontFamily: 'roboto-italic',
        fontSize: 12,
        color: '#777777',
        textAlign: 'center',
    },
})