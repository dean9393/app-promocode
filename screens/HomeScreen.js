import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Promo from '../components/Promo';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Акции',
    headerStyle: {
      backgroundColor: '#1E88E5',
    },
    headerTintColor: '#fff',
  };

  constructor(props){
    super(props)
    this.state = {
      isLoad: false
    }
    this.props.navigation.navigate('Login');
  }

  componentDidMount() {
      /*value = AsyncStorage.getItem('city_id', (err, res) => {
        fetch('http://promocodehealth.ru/public/api/promolist/'+res)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            promotions: responseJson,
            isLoad: true
          });
        })
        .catch((error) =>{
          console.error('promotions: '+error);
        })
      })*/
      this.setState({
        promotions: require('../components/PromoList.json'),
        isLoad: true,
      }) 
  }

  render() { 
    return (
      <View style={ styles.container }>
        <ScrollView style={ styles.scrollview }>
          {
            this.state.isLoad &&
              <View>
                { 
                  this.state.promotions.map((promo) => {
                    return( 
                        <Promo key={ promo.id } data={ promo } />
                    );
                  })
                }
              </View>
          }
          {
            !this.state.isLoad &&
            <View>
              <ActivityIndicator size={ 100 } color={ Colors.navigationTitle } />
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
  },
});
