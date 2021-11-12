import axios from "axios";

export function getDogs() {

  return async function(dispatch) {
    
    var allDogs = await axios.get('http://localhost:3001/dogs');
    
    return dispatch({
      type: 'GET_DOGS',
      payload: allDogs.data
    });
  }
}