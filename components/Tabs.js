import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default class Tabs extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            active: 0,
        }
    }

    render(){
        return(
            <View style={styles.tabsContainer}>
                <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                    {
                    this.props.tabs.map((item, index) => {
                        return(
                        <TouchableOpacity
                        key={item.id} 
                        style={[styles.tabItem, (this.state.active == item.id) ? styles.active : '']}
                        onPress={() => {
                            //console.log(item.id);
                            this.setState({
                                active: item.id
                            })
                            this.props.callback(item.id)
                        }}
                        activeOpacity={1}>
                            <Text style={styles.tabText}>{item.title.toUpperCase()}</Text>
                        </TouchableOpacity>
                        )
                    })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabsContainer: {
        backgroundColor: Colors.navigationTitle,
    },
    tabText: {
        color: '#fff',
        fontFamily: 'roboto-medium',
        fontSize: 14
    },
    tabItem: {
        paddingVertical: 20,
        paddingHorizontal: 18,
    },
    active: {
        borderBottomColor: '#fff',
        borderBottomWidth: 5,
    }
})