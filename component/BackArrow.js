import React, { Component } from "react";
import { BackHandler, TouchableOpacity, View } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";

export default class BackArrow extends Component {
  /*   constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  } */
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleBackButtonClick}>
          <Icons
            name={"arrow-back"}
            size={30}
            color="black"
            style={{ marginLeft: "3%", marginTop: "16%" }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
