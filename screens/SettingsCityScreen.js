import React from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
	AsyncStorage,
    SafeAreaView,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Colors from '../constants/Colors';
import RadioButton from '../components/RadioButton';

class SettingsCityScreen extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { radioItems: 
            [
                {
                    name: 'Краснодар',
                    id: 1,
                }, 
     
                {
                    name: 'Москва',
                    id: 2,
                },
     
                {
                    name: 'Питер',
                    id: 3,
                },
     
                {
                    name: 'Крыжополь',
                    id: 4,
                }
            ], 
            selectedItem: '',
            loading: false,
        }
    }

    componentDidMount()
    {
        this.state.radioItems.map(( item ) =>
        {
            if( item.selected == true )
            {
                this.setState({ selectedItem: item.value });
            }
        });

        this.getCityList();
    }

    getCityList = () => {
        this.setState({loading: true})
        axios.get('https://promocodehealth.ru/public/api/citylist')
        .then(response => {
            this.setState({
                loading: false,
                radioItems: response.data,
            })
        })
        .catch(error => {
            console.log("General Settings : " + error.response.data.message);
            this.setState({
                loading: false
            })
        })
    }

    changeActiveRadioButton(index)
    {
        this.state.radioItems.map(( item ) =>
        {
            item.selected = false;
        });
 
        this.state.radioItems[index].selected = true;
 
        this.setState({ radioItems: this.state.radioItems }, () =>
        {
            this.setState({ selectedItem: this.state.radioItems[index].value });
        });

        AsyncStorage.setItem('city_id', this.state.radioItems[index].id.toString());
        AsyncStorage.setItem('city', this.state.radioItems[index].name);
        this.props.onAddCityId(this.state.radioItems[index].id.toString());
        this.props.onAddCityTitle(this.state.radioItems[index].name);
        this.props.onRHome(true);
    }

    render()
    {
        return(
            <SafeAreaView style={styles.areaContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Ваш город</Text>
                    <ScrollView>
                        <View style={styles.cityBlock}>
                        {this.state.radioItems.map(( item, key ) =>
                            (
                                <RadioButton key = { key } button = { item } onClick = { this.changeActiveRadioButton.bind( this, key ) }/>
                            ))
                        }
                        </View>
                        <View style={{ height:5 }}></View>
                    </ScrollView>
                    { this.state.loading &&
                        <ActivityIndicator 
                            size={ 100 } 
                            color={ Colors.navigationTitle }
                            style={styles.ActivityIndicatorStyle}
                        />
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
        onAddCityId: (id) => {
            dispatch({type: 'setCityId', value: id})
        },
        onAddCityTitle: (title) => {
            dispatch({type: 'setCityTitle', value: title})
        },
        onRHome: (status) => {
            dispatch({type: 'setRHome', value: status})
        }
    })
)(SettingsCityScreen);

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
    selectedTextHolder:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText:{
        fontSize: 18,
        color: 'white'
    },
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(255,255,255,0.6)",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 80,
    },
})