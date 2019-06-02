import * as types from "./../constants/actionTypes";
import initialState from "./initialState";

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.GET_MOVIES_REQUEST:
      return { ...state, loading: true };
    case types.GET_MOVIES_SUCCESS:
      return { ...state, loading: false, success: action.getMovies };
    case types.GET_MOVIES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
