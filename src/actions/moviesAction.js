import { AsyncStorage } from "react-native";
import * as types from "./../constants/actionTypes";
import * as config from "./../constants/config";

export function getMoviesRequest() {
  return { type: types.GET_MOVIES_REQUEST };
}

export function getMoviesSuccess(data) {
  return { type: types.GET_MOVIES_SUCCESS, data };
}

export function getMoviesFail(error) {
  return { type: types.GET_MOVIES_FAIL, error };
}

export function getMovieDetailsRequest() {
  return { type: types.GET_MOVIE_DETAILS_REQUEST };
}

export function getMovieDetailsSuccess(data) {
  return { type: types.GET_MOVIE_DETAILS_SUCCESS, data };
}

export function getMovieDetailsFail(error) {
  return { type: types.GET_MOVIE_DETAILS_FAIL, error };
}

export function getMovies(cityName) {
  return async dispatch => {
    try {
      dispatch(getMoviesRequest());
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          config.API_KEY
        }&language=en-US&page=1&region=${cityName}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      );
      const responseJson = await response.json();
      dispatch(getMoviesSuccess(responseJson));
      return responseJson;
    } catch (error) {
      dispatch(getMoviesFail(error));
      console.error(error);
    }
  };
}
