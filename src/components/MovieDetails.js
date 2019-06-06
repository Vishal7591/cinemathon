import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform
} from "react-native";
import { genericStyles, favouriteIcon } from "./../styles/main";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as config from "./../constants/config";
class MovieDetails extends Component {
  state = {
    movieData: [],
    genreNames: []
  };
  componentDidMount = () => {
    const movieData = this.props.navigation.getParam("movieData");
    const genreIds = movieData.genre_ids;

    for (var i = 0; i < genreIds.length; i++) {
      this.state.genreNames.push(
        config.genres.find(item => item.id == genreIds[i]).name
      );
    }
    this.setState({ movieData: movieData, genreNames: this.state.genreNames });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={[styles.container]}>
          <View style={styles.titleSection}>
            <View style={styles.movieSection}>
              <View style={styles.posterSection}>
                <Image
                  style={styles.imagePoster}
                  source={{
                    uri: `${config.IMAGE_BASE_URI}${
                      this.state.movieData.backdrop_path
                    }`
                  }}
                />
              </View>
              <View style={styles.movieTitleSection}>
                <Text
                  style={[
                    genericStyles.boldText,
                    { fontSize: 20, flexWrap: "wrap" }
                  ]}
                >
                  {this.state.movieData.original_title}
                </Text>
                <Text style={[genericStyles.regularText, { fontSize: 17 }]}>
                  Rated- {this.state.movieData.adult ? "A" : "U/A"}
                </Text>
                <Text style={[genericStyles.regularText, { fontSize: 17 }]}>
                  Language- {this.state.movieData.original_language}
                </Text>
              </View>
            </View>
            <View style={styles.releasedSection}>
              <Text style={[genericStyles.boldText, { fontSize: 17 }]}>
                Released On-
                {" " +
                  new Date(this.state.movieData.release_date)
                    .toString()
                    .substring(4, 15)}
              </Text>
            </View>
          </View>

          <View style={styles.overviewSection}>
            <Text style={[genericStyles.boldText, { fontSize: 20 }]}>
              Overview
            </Text>
            <Text
              style={[
                genericStyles.regularText,
                { fontSize: 16, fontFamily: "Roboto-Medium" }
              ]}
            >
              {this.state.movieData.overview}
            </Text>
          </View>
          <View style={styles.genresSection}>
            <Text style={[genericStyles.boldText, { fontSize: 20 }]}>
              Genres
            </Text>
            <Text
              style={[
                genericStyles.regularText,
                { fontSize: 16, fontFamily: "Roboto-Medium" }
              ]}
            >
              {this.state.genreNames.join(", ")}
            </Text>
          </View>
          <View
            style={styles.ratingsSection}
          >
            <Text style={[genericStyles.boldText, { fontSize: 20 }]}>
              Ratings
            </Text>
            <View style={{ flex: 1, flexDirection: "row", paddingVertical: 5 }}>
              {favouriteIcon}
              <Text
                style={[
                  genericStyles.regularText,
                  { fontSize: 16, fontFamily: "Roboto-Medium" }
                ]}
              >
                {" " + this.state.movieData.vote_average} - IMDB
              </Text>
              <View style={styles.votesSection}>
                <AntDesign name="like1" title="Like" size={24} color={this.state.movieData.localFavourite ? "#98FB98":"#fff"} />
                <Text
                  style={[
                    genericStyles.regularText,
                    {
                      fontSize: 18,
                      paddingTop: Platform.OS === "android" ? 5 : 0
                    }
                  ]}
                >
                  {" " + this.state.movieData.vote_count}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3060B0"
  },
  posterSection: {
    flex: 1,
    paddingTop: "1%",
    alignContent: "center",
    // justifyContent: "center",
    padding: 5
  },
  movieSection: {
    flex: 2,
    justifyContent: "center",
    flexDirection: "row"
  },
  titleSection: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "#000"
  },
  imageSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  movieTitleSection: {
    flex: 1,
    paddingLeft: Platform.OS === "android" ? 10 : 5,
    // alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  imagePoster: {
    height: 240,
    width: 180,
    resizeMode: "contain"
  },
  ratingsSection:{
    flex: 1,
    justifyContent: "center",
    padding: 10,
    flexDirection: "column"
  },
  votesSection: {
    flex: 1,
    paddingLeft: 80,
    flexDirection: "row"
  },
  genresSection: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    flexDirection: "column"
  },
  overviewSection: {
    flex: 1,
    marginTop: "10%",
    justifyContent: "center",
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  releasedSection: {
    flex: 1,
    justifyContent: "center",
    bottom: 20,
    alignItems: "center"
  }
});
