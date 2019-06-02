import * as types from "./../constants/actionTypes";
import initialState from "./initialState";

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.GET_MOVIE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case types.GET_MOVIE_DETAILS_SUCCESS:
      return { ...state, loading: false, success: action.getMovieDetails };
    case types.GET_MOVIE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
