import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {

    if(this.props.custom){
      return ( 
        <Icon.FontAwesome
        name={this.props.name}
        size={this.props.size ? this.props.size : 26}
        style={this.props.style}
        color={this.props.color ? this.props.color : Colors.tabIconDefault }
        /> 
      );
    }

    if(this.props.font === 'FontAwesome'){
      return (
        <Icon.FontAwesome
        name={this.props.name}
        size={26}
        style={{marginBottom: -3}}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      );
    }

    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}