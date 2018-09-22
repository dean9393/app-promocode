import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    TextInput,
    Linking
} from 'react-native';
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';

class PinScreen extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.navigation.props.phone)
    }

    render()
    {
        return(
            <View></View>
        )
    }
}
export default withNavigation(PinScreen)

const styles = StyleSheet.create({

})