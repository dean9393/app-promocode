import React from 'react';
import {
    NetInfo,
    View,
} from 'react-native';
import { Icon } from 'expo';

export default class DropNerwork extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            isConnect: false
        }
    }

    componentDidMount()
    {
        // on start app
        this.setState({
            isConnect: NetInfo.isConnected
        });
        // on change internet connection app
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            (isConnected) => {
                this.setState({
                    isConnect: isConnected
                });
                console.log('connect: '+isConnected.toString());
            }
        );
    }

    componentWillUnmount()
    {
        NetInfo.removeEventListener(
            'connectionChange',
            this.setState({
                isConnect: false
            })
        );
    }

    render()
    {
        if(!this.state.isConnect)
        {
        return (
            <View
                style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    backgroundColor: '#FC1A1A',
                    padding: 15,
                    marginBottom: 60,
                    marginRight: 10,
                    right: 0,
                    bottom: 0,
                    zIndex:10,
                    borderRadius: 5,
                }}
            >
                <Icon.Feather
                    name={'wifi-off'}
                    size={29}
                    style={{ marginBottom: -3 }}
                    color={'#fff'}
                />
            </View>
        );
        }
        return (
            <View></View>
        );
    }
}