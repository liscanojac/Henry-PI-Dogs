// import { combineReducers } from "redux";
// import { temperamentsReducer } from "./temperamentsReducer";

// const reducers = combineReducers({
//   allTemperaments: temperamentsReducer
// });

// export default reducers;

import { ActionTypes } from "../constants";

const initialState = {
  dogs: [],
  allDogs: [],
  dogsByName: [],
  dogsByWeight: [],
  temperaments: [],
  dogDetails: []
}

function rootReducer(state = initialState, action) {

  switch(action.type) {
    case ActionTypes.GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };
    case ActionTypes.DOG_DETAILS:
      return {
        ...state,
        dogDetails: action.payload
      };
    case ActionTypes.GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: action.payload
      };
    case ActionTypes.GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      };
    case ActionTypes.POST_DOG:
      return state;
    default:
      return state;
  }
};

export default rootReducer;