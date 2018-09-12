import React from 'react';
import { 
	View,
	ScrollView,
	StyleSheet,
} from 'react-native';
import HTML from 'react-native-render-html';

export default class InfoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title,
    });

    render()
    {
        const text = this.props.navigation.state.params.text;
        return(
            <View style={styles.container}>
                <ScrollView>
                    <HTML html={text} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
		padding: 10,
	},
})