import React from 'react';
import { 
  Platform, 
  StatusBar, 
  StyleSheet, 
  View, 
  AsyncStorage
} from 'react-native';
import { 
  AppLoading, 
  Font, 
  Icon 
} from 'expo';
import { Provider } from 'react-redux';
import { store } from './redux/app-redux';

import SideNavigator from './navigation/SideNavigator';

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
        </View>
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <SideNavigator />
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'roboto': require('./assets/fonts/roboto-regular.ttf'),
        'roboto-bold': require('./assets/fonts/roboto-bold.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      }),
      /*axios.post('https://promocodehealth.ru/public/api/categories/')
      .then(response => {
        store.dispatch({
          type: 'setCategory',
          value: response.data.data.cat
        });
        store.dispatch({
          type: 'setSubcategory',
          value: response.data.data.subcat
        });
        store.dispatch({
          type: 'setUser',
          value: response.data.data.user
        });
      })
      .catch(error => {
        console.log('Start: ' + error);
      }),*/
      //=======================================================
      d = require('./json/category.json'),
      store.dispatch({
        type: 'setCategory',
        value: d.data.cat
      }),
      store.dispatch({
        type: 'setSubcategory',
        value: d.data.subcat
      }),
      store.dispatch({
        type: 'setUser',
        value: d.data.user
      }),
      store.dispatch({
        type: 'setNotifications',
        value: true
      }),
      //=======================================================
      this._check(),
    ]);
  };

  _check = async () => {
    try {
      let value = await AsyncStorage.getItem('city_id');
      if(value == null){
        AsyncStorage.setItem('city_id', "1");
        AsyncStorage.setItem('city', 'Краснодар');
      }
      store.dispatch({
        type: 'setCityId',
        value: await AsyncStorage.getItem('city_id')
      });
      store.dispatch({
        type: 'setCityTitle',
        value: await AsyncStorage.getItem('city')
      });
      value = await AsyncStorage.getItem('notifications');
      if(value == null){
        AsyncStorage.setItem('notifications', "true");
      }
      store.dispatch({
        type: 'setNotifications',
        value: (await AsyncStorage.getItem('notifications') == 'true')? true : false
      })
    } catch(error){
      console.log('check: '+error);
    }
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAE5EA',
  },
});