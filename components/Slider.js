import React from 'react';
import { View, Image,StyleSheet, Text,TouchableHighlight, } from 'react-native';
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
                isScroll={ this.props.isScroll }
                style= {{
                    borderTopLeftRadius: this.props.r, 
                    borderTopRightRadius: this.props.r,
                    width: this.props.w
                }}
                customSlide={({ index, item, style, width }) => (
                    <View key={index} style={[style, styles.customSlide]}>
                        <Image source={{ uri: item }} style={{ 
                            width: width, 
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
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: 'transparent',
    },
    buttons: {
        position: 'absolute',
        bottom: 15,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        paddingRight: 15,
    },
    button: {
        backgroundColor: '#D3D6D6',
        width: 15,
        height: 5,
        marginHorizontal: 2,
        borderRadius: 2,
    },
    buttonSelected: {
        backgroundColor: Colors.navigationTitle,
        borderRadius: 3,
        width: 15,
        height: 5,
    }
});