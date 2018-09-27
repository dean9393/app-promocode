import React from 'react';
import { 
	View, 
	Text, 
    StyleSheet,
    ActivityIndicator,
    AsyncStorage,
    Dimensions,
    Keyboard
} from 'react-native';
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Colors from '../constants/Colors';
import axios from 'axios';
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

class CreateReviewScreen extends React.Component
{

    constructor(props)
    {
        super(props)

        this.id = this.props.navigation.state.params.id
        this.user = null
        this.state={
            isLoad: false,
            user: this.props.user
        }
    }

    // Read AsyncStorage
    _retrieveData = () => {
        if(this.props.user == null) {
            this.props.navigation.navigate('Login', {back: 'CreateReview',})
        } else {
            this.setState({
                isLoad: true
            })
        }
    }

    componentDidMount()
    {
        if(this.props.user == null) {
            this.props.navigation.navigate('Login', {back: 'CreateReview',})
        }
        /*willFocus = this.props.navigation.addListener(
            'willFocus',
            payload => {
              //this.forceUpdate();
              this._retrieveData()
              console.log('willFocus')
            }
        );
        didFocus = this.props.navigation.addListener(
            'didFocus',
            payload => {
              //this.forceUpdate();
              this._retrieveData()
              console.log('didFocus')
            }
        );*/
        
    }

    render()
    {
        return(
        <View style={ styles.container }>
            { this.props.user && //this.state.isLoad && 
            <Text>Create {this.id}</Text>
            }
            { !this.props.user && //!this.state.isLoad &&
                <ActivityIndicator
                    color='#1E88E5'
                    size='large'
                    style={styles.ActivityIndicatorStyle}
                />
                
            }
        </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    ActivityIndicatorStyle:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})