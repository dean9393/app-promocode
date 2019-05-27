import React from 'react';
import {
    Text,
    View,
    StyleSheet,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

class RadioButton extends React.Component
{
    constructor()
    {
        super();
    }
 
    render()
    {
        return(
            <TouchableOpacity onPress = { this.props.onClick } activeOpacity = { 0.8 } style = { styles.radioButton }>
                <View style={styles.circleBlock}>
                    <View style = {[ styles.radioButtonHolder, { height: 16, width: 16, borderColor: '#85C8DE' }]}>
                    {
                        (this.props.button.id == this.props.store.city_id)
                        ?
                            (<View style = {[ styles.radioIcon, { height: 8, width: 8, backgroundColor: '#85C8DE' }]}></View>)
                        :
                            null
                    }
                    </View>   
                </View>
                <View>
                    <Text style = {[ styles.label, { color: '#000' }]}>{ this.props.button.name }</Text>
                    <Text style = {styles.desc}>{ (this.props.button.id == this.props.store.city_id)? 'По умолчанию' : 'Не выбран' }</Text>
                </View>
                
            </TouchableOpacity>
        );
    }
}
export default connect(
    state => ({
        store: state
    }),
)(RadioButton);

const styles = StyleSheet.create({
    radioButton:{
        flexDirection: 'row',
        margin: 10,
    },
    circleBlock: {
        alignSelf: 'center',
        paddingRight: 10,
    },
    radioButtonHolder:{
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioIcon:{
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label:{
        fontSize: 16
    },
    desc: {
        fontSize: 12,
        opacity: 0.5,
    },
})