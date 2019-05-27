import React from 'react';
import {
    Text,
    View,
    StyleSheet,
	TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';

class SettingsPhoneScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidUpdate() {
        if(this.props.store.error){
            this.error = this.props.store.error;
            this.props.onAddError(false);
        }
    }

    pressChange = () => {
        this.props.onAddBack('Settings');
        this.props.navigation.navigate('Login');
    }

    render()
    {
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Мобильный телефон</Text>
                    <Text style={styles.phone}>{this.props.store.user.phone}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={this.pressChange}>
                        <Text style={styles.link}>Изменить номер</Text>
                    </TouchableOpacity>
                    {this.error && 
                        <Text style={styles.error}>Номер телефона занят</Text>
                    }
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
        },
        onAddError: (error) => {
            dispatch({type: 'setError', value: error})
        }
    })
)(SettingsPhoneScreen);

const styles = StyleSheet.create({
    areaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        paddingVertical: 20,
    },
    phone: {
        fontSize: 16,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    link: {
        fontSize: 14,
        color: '#85C8DE',
        textAlign: 'right',
        paddingVertical: 10,
    },
    error: {
        fontSize: 14,
        color: '#6A0101'
    }
})