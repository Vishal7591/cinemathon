import { combineReducers } from "redux";
import getMovies from "./getMoviesReducer";
import getMovieDetails from "./getMovieDetailsReducer";

export const rootReducer = combineReducers({
  getMovies,
  getMovieDetails
});
