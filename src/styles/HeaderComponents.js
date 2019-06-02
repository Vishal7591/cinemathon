import { Platform, StyleSheet } from "react-native";
import React, { Component } from "react";

export const componentWithHeader = {
  headerStyle: {
    backgroundColor: "#3060B0",
    borderBottomWidth: 0,
    borderWidth: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: "#FFFFFF",
  title: "Cinemathon",
  titleStyle: { alignSelf: "center", textAlign: "center" },
  gesturesEnabled: false
};

export const componentWithNoHeader = {
  headerLeft: null,
  headerStyle: {
    backgroundColor: "#3023ae",
    height: 0
  },
  gesturesEnabled: false
};
