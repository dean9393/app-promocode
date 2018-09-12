import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import DropNetwork from './components/DropNetwork';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    categories: '',
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <View>
          <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
        <DropNetwork />
        </View>
        
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <DropNetwork />
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
      /*fetch('http://promocodehealth.ru/public/api/categories/')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          categories: responseJson.data,
        })
      })
      .catch((error) =>{
        console.error('category: '+error);
      }),*/
      this._check(),
    ]);
  };

  _check = async () => {
    let context = this;
    try {
      let value = await AsyncStorage.getItem('city_id');
      if(value == null){console.log(value);
        AsyncStorage.setItem('city_id', "1");
        AsyncStorage.setItem('city', 'Краснодар');
      }
    } catch(error){
      console.log('check: '+error);
    }
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => { console.log(this.state.categories);
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
