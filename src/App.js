/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import SplashScreen from "react-native-splash-screen";
import { AppContainer } from "./screens";
const store = configureStore();
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  componentDidMount = () => {
    console.disableYellowBox = true;
    SplashScreen.hide();
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#3060B0" />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    color: "#f5fcff",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#f5fcff",
    marginBottom: 5
  }
});
