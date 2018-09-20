import React from 'react';
import { View, Image, Dimensions, StyleSheet, Text,TouchableHighlight, } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import Colors from '../constants/Colors';

export default class Slider extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
            <ImageSlider
                autoPlayWithInterval={ 5000 }
                images={ this.props.images }
                style= {{
                    borderTopLeftRadius: this.props.r, 
                    borderTopRightRadius: this.props.r
                }}
                customSlide={({ index, item, style, width }) => (
                    <View key={index} style={[style, styles.customSlide]}>
                        <Image source={{ uri: item }} style={{ 
                            width: this.props.w, 
                            height: this.props.h, 
                            borderTopLeftRadius: this.props.r, 
                            borderTopRightRadius: this.props.r }} />
                    </View>
                )}
                customButtons={(position, move) => (
                    <View style={styles.buttons}>
                      {this.props.images.map((image, index) => {
                        return (
                          <TouchableHighlight
                            key={index}
                            underlayColor="#ccc"
                            onPress={() => move(index)}
                            style={styles.button}
                          >
                            <Text style={position === index && styles.buttonSelected}>
                              
                            </Text>
                          </TouchableHighlight>
                        );
                      })}
                    </View>
                )}
            />
        )
    }
}
const styles = StyleSheet.create({
    customSlide: { 
        position: 'relative',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,backgroundColor: 'transparent',
    },
    customImage: {
        width: Dimensions.get('window').width - 40,
        height: (Dimensions.get('window').width - 40) / 1.766,
    },
    buttons: {
        position: 'absolute',
        bottom: 15,
        right: 5,
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: '#D3D6D6',
        width: 15,
        height: 5,
        marginHorizontal: 5,
        borderRadius: 2,
    },
    buttonSelected: {
        backgroundColor: Colors.navigationTitle,
        borderRadius: 3,
        width: 15,
        height: 5,
    }
});