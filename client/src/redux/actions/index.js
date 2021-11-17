import { ActionTypes } from "../constants";
import axios from 'axios';

// export const setTemperaments = (temperaments) => {

//   return {
//     type: ActionTypes.SET_TEMPERAMENTS,
//     payload: temperaments
//   };
// };

export function getDogs() {

  return async function(dispatch) {

    var json = await axios.get('http://localhost:3001/dogs');

    return dispatch({
      type: ActionTypes.GET_DOGS,
      payload: json.data
    });
  };
};

export function getDogDetails(id) {

  return async function(dispatch) {

    var json = await axios.get(`http://localhost:3001/dogs/${id}`);

    return dispatch({
      type: ActionTypes.DOG_DETAILS,
      payload: json.data
    });
  };
};

export function getDogsByName(name) {

  return async function(dispatch) {
    
    var json = await axios.get(`http://localhost:3001/dogs?name=${name}`);

    return dispatch({
      type: ActionTypes.GET_DOGS_BY_NAME,
      payload: json.data
    });
  };
};

export function getTemperaments() {

  return async function(dispatch) {

    var json = await axios.get('http://localhost:3001/temperament');

    return dispatch({
      type: ActionTypes.GET_TEMPERAMENTS,
      payload: json.data
    });
  };
};

export function filterDogsByTemperament(payload) {

  return {
    type: ActionTypes.FILTER_BY_TEMPERAMENT,
    payload
  }
}