import React from 'react';
import {
    Text,
    View,
    StyleSheet,
	Switch,
    SafeAreaView,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

class SettingsNotificationScreen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            switch: (this.props.store.notifications) ? true : false
        }
    }

    toggleSwitch = (value) => {
        this.setState({
            switch: value
        })
        this.props.onAddNotifications(value)
        value ? AsyncStorage.setItem('notifications', "true") : AsyncStorage.setItem('notifications', "false");
    }

    render()
    {
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Разрешить уведомления?</Text>
                    <View style={styles.row}>
                        <View style={{flexGrow: 1}}>
                            <Text style={styles.title2}>Новости партнеров PCH</Text>
                            <Text style={styles.subtitle}>Изменения размера скидки и т.д.</Text>
                        </View>
                        <Switch
                            onValueChange = {this.toggleSwitch}
                            value = {this.state.switch}/>
                    </View>
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
		onAddNotifications: (value) => {
			dispatch({type: 'setNotifications', value: value})
        }
    })
)(SettingsNotificationScreen);
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
    title2: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.54,
    },
    row: {
        flexDirection: 'row',
    }
})