import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as config from "./../constants/config";
// import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import {
  genericStyles,
  likeIcon,
  favouriteIcon,
  starIcon,
  sadIcon
} from "./../styles/main";
import * as moviesAction from "../actions/moviesAction";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Platform
} from "react-native";

class MoviesDashboard extends Component {
  state = {
    moviesData: [],
    cityName: "",
    loading: false,
    refreshing: false
  };

  componentDidMount = async () => {
    this.setState({
      loading: true
    });
    navigator.geolocation.getCurrentPosition(
      async position => {
        const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?key=${
          config.GEOCODING_API_KEY
        }&latlng=${position.coords.latitude},${
          position.coords.longitude
        }&sensor=true`;
        const result = await (await fetch(apiURL)).json();
        console.log("Reverse Geocoding", result);
        let cityName = result.results[0].address_components.find(
          item =>
            item.types[0] === "administrative_area_level_2" ||
            item.types[0] === "locality"
        ).long_name;
        this.getMoviesData(cityName);
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
    // BackgroundGeolocation.configure({
    //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //   stationaryRadius: 50,
    //   distanceFilter: 50,
    //   notificationTitle: "Background tracking",
    //   notificationText: "enabled",
    //   debug: true,
    //   startOnBoot: false,
    //   stopOnTerminate: true,
    //   locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    //   interval: 10000,
    //   fastestInterval: 5000,
    //   activitiesInterval: 10000,
    //   stopOnStillActivity: false,
    //   url: "http://192.168.81.15:3000/location",
    //   httpHeaders: {
    //     "X-FOO": "bar"
    //   },
    //   // customize post properties
    //   postTemplate: {
    //     lat: "@latitude",
    //     lon: "@longitude",
    //     foo: "bar" // you can also add your own properties
    //   }
    // });

    // BackgroundGeolocation.on("location", location => {
    //   // handle your locations here
    //   // to perform long running operation on iOS
    //   // you need to create background task
    //   BackgroundGeolocation.startTask(taskKey => {
    //     // execute long running task
    //     // eg. ajax post location
    //     // IMPORTANT: task has to be ended by endTask
    //     BackgroundGeolocation.endTask(taskKey);
    //   });
    // });

    // BackgroundGeolocation.on("stationary", stationaryLocation => {
    //   // handle stationary locations here
    //   console.log("Location", stationaryLocation);
    //   Actions.sendLocation(stationaryLocation);
    // });

    // BackgroundGeolocation.on("error", error => {
    //   console.log("[ERROR] BackgroundGeolocation error:", error);
    // });

    // BackgroundGeolocation.on("start", () => {
    //   console.log("[INFO] BackgroundGeolocation service has been started");
    // });

    // BackgroundGeolocation.on("stop", () => {
    //   console.log("[INFO] BackgroundGeolocation service has been stopped");
    // });

    // BackgroundGeolocation.on("authorization", status => {
    //   console.log(
    //     "[INFO] BackgroundGeolocation authorization status: " + status
    //   );
    //   if (status !== BackgroundGeolocation.AUTHORIZED) {
    //     // we need to set delay or otherwise alert may not be shown
    //     setTimeout(
    //       () =>
    //         Alert.alert(
    //           "App requires location tracking permission",
    //           "Would you like to open app settings?",
    //           [
    //             {
    //               text: "Yes",
    //               onPress: () => BackgroundGeolocation.showAppSettings()
    //             },
    //             {
    //               text: "No",
    //               onPress: () => console.log("No Pressed"),
    //               style: "cancel"
    //             }
    //           ]
    //         ),
    //       1000
    //     );
    //   }
    // });

    // BackgroundGeolocation.on("background", () => {
    //   console.log("[INFO] App is in background");
    // });

    // BackgroundGeolocation.on("foreground", () => {
    //   console.log("[INFO] App is in foreground");
    // });

    // BackgroundGeolocation.on("abort_requested", () => {
    //   console.log("[INFO] Server responded with 285 Updates Not Required");

    //   // Here we can decide whether we want stop the updates or not.
    //   // If you've configured the server to return 285, then it means the server does not require further update.
    //   // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    //   // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    // });

    // BackgroundGeolocation.on("http_authorization", () => {
    //   console.log("[INFO] App needs to authorize the http requests");
    // });

    // BackgroundGeolocation.checkStatus(status => {
    //   console.log(
    //     "[INFO] BackgroundGeolocation service is running",
    //     status.isRunning
    //   );
    //   console.log(
    //     "[INFO] BackgroundGeolocation services enabled",
    //     status.locationServicesEnabled
    //   );
    //   console.log(
    //     "[INFO] BackgroundGeolocation auth status: " + status.authorization
    //   );

    //   // you don't need to check status before start (this is just the example)
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start(); //triggers start on start event
    //   }
    // });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  };

  getMoviesData = async cityName => {
    var city = cityName ? cityName : this.state.cityName;
    const responseData = await this.props.actions.getMovies(city);
    this.setState({
      cityName: city,
      loading: false,
      moviesData: responseData.results.slice(0, 10)
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={[styles.container]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getMoviesData}
            />
          }
        >
          <View style={styles.topMenu}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {starIcon}
              <Text
                style={[
                  genericStyles.boldText,
                  {
                    fontSize: 17,
                    paddingTop: Platform.OS === "android" ? 5 : 0
                  }
                ]}
              >
                {" "}
                TOP 10 PICKS AROUND YOU
              </Text>
            </View>
            {this.state.cityName !== "" && (
              <Text style={[genericStyles.boldText, { fontSize: 17 }]}>
                You're in {this.state.cityName}
              </Text>
            )}
          </View>
          {this.state.moviesData.length < 1 && (
            <View style={genericStyles.noMoviesFoundSection}>
              {sadIcon}
              <Text
                style={[
                  genericStyles.boldText,
                  {
                    fontSize: 20,
                    paddingTop: 10
                  }
                ]}
              >
                SORRY, NO MOVIES FOUND !!
              </Text>
            </View>
          )}
          <FlatList
            data={this.state.moviesData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={genericStyles.movieTile}
                activeOpacity={1}
                onPress={() =>
                  this.props.navigation.navigate("MovieDetails", {
                    movieData: item
                  })
                }
              >
                <View style={styles.imageSection}>
                  <Image
                    style={styles.imagePoster}
                    source={{
                      uri: `${config.IMAGE_BASE_URI}${item.poster_path}`
                    }}
                  />
                </View>
                <View style={styles.descriptionPanel}>
                  <View style={{ flex: 1 }}>
                    <Text style={[genericStyles.boldText, { fontSize: 17 }]}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={genericStyles.regularText}>
                      Released On-
                      {" " +
                        new Date(item.release_date).toString().substring(4, 15)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={genericStyles.boldText}>
                      Rated-
                      {item.adult ? "A" : "U/A"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      {favouriteIcon}
                      <Text style={genericStyles.regularText}>
                        {" " + item.vote_average} - IMDB
                      </Text>
                    </View>

                    <View style={styles.votesSection}>
                      {likeIcon}
                      <Text style={genericStyles.regularText}>
                        {item.vote_count}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        {this.props.getMovies.loading ||
          (this.state.loading && (
            <View style={genericStyles.loading}>
              <ActivityIndicator size="large" color="#dcdcdc" />
              <Text style={[genericStyles.screenLoadingText]}>
                Please Wait...
              </Text>
            </View>
          ))}
      </View>
    );
  }
}

MoviesDashboard.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(moviesAction, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesDashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3060B0"
  },
  votesSection: {
    flex: 1,
    alignItems: "flex-end",
    bottom: 20,
    right: 8
  },
  topMenu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    flexDirection: "column"
  },
  descriptionPanel: {
    flex: 5,
    flexDirection: "column"
  },
  imageSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  imagePoster: {
    borderRadius: 20,
    height: 100,
    width: 180,
    resizeMode: "contain"
  }
});
