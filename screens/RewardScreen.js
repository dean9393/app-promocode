import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
} from 'react-native';
import { Icon } from 'expo';
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';
import {connect} from 'react-redux';
import { setUser } from '../redux/app-redux';

const mapStateToProps = (state) => {
    return{
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (text) => {dispatch(setUser(text))}
    };
}

class RewardScreen extends React.Component
{
    constructor(props)
    {
        super(props)

        this.promocode = this.props.navigation.state.params.promocode
        this.status = this.props.navigation.state.params.status
    }

    render()
    {
        return(
            <View style={styles.container}>
                <Icon.Feather
                    name={'award'}
                    size={80}
                    color={'#000'}
                    style={styles.icon}
                />
                { (this.status == 2) &&
                    <View>
                        <Text style={styles.text1}>Ваш промокод</Text>
                        <Text style={styles.text2}>{this.promocode}</Text>
                    </View>
                }
                { (this.status == 1) &&
                    <View>
                        <Text style={styles.text3}>Вы уже участвовали в этой акции</Text>
                    </View>
                }
                { (this.status == 0) &&
                    <View>
                        <Text style={styles.text3}>Промокоды только что закончились...</Text>
                    </View>
                }
                <Button
                    large
                    title={'На главную'}
                    color='#fff'
                    onPress={ () => { this.props.navigation.navigate('Home') } }
                    buttonStyle={ styles.button } 
                />
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RewardScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1:{
        fontSize: 20,
        marginTop: 15,
        textAlign: 'center'
    },
    text2:{
        fontSize: 22,
        marginTop: 15,
        textAlign: 'center'
    },
    text3:{
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center'
    },
    button: {
        backgroundColor: Colors.bottomButton,
        marginTop: 20,
		marginBottom: 20,
	},
})