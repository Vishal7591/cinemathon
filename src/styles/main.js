import { StyleSheet } from "react-native";
import React, { Component } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const genericStyles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff"
  },
  loadingText: {
    textAlign: "center",
    color: "#dcdcdc",
    fontFamily: "Roboto-Medium",
    fontSize: 15
  },
  screenLoadingText: {
    textAlign: "center",
    color: "#dcdcdc",
    fontFamily: "Roboto-Medium",
    fontSize: 17
  },
  regularText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Roboto-Regular"
  },
  noMoviesFoundSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "20%",
    flexDirection: "column"
  },
  boldText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Roboto-Bold"
  },
  movieTile: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 5,
    height: 120,
    borderRadius: 10
  }
});

export const likeIcon = (
  <AntDesign name="like1" title="Like" size={20} color="#fff" />
);

export const favouriteIcon = (
  <MaterialIcons name="favorite" title="Favourite" size={20} color="red" />
);

export const starIcon = (
  <MaterialIcons name="star" title="Star" size={26} color="#fff" />
);

export const sadIcon = (
  <FontAwesome5 name="sad-tear" title="Sad" size={50} color="#fff" />
);
