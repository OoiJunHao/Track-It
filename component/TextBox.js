import React, { Component } from "react";
import { Item, Input, Icon, Label } from "native-base";
import {Text} from "react-native";

class TextBox extends Component {
  render() {
    const { label, icon, onChange, value } = this.props;
    return (
      <Item floatingLabel style={{width: 250, marginVertical: 10, alignSelf: 'center'}}>
        <Icon active name={icon} />
        <Label>{label}</Label>
        <Input onChangeText={(e) => onChange(e)} value={value} />
      </Item>
    );
  }
}

export default TextBox;
