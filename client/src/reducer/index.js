
const initialState = {
  dogs: [],
  allDogs: [],
  orderDogsAlphabetically: [],
  orderDogsByWeight: [],
  temperaments: [],
  dogDetails: []
}

function rootReducer(state = initialState, action) {

  switch(action.type) {
    case "GET_DOGS" :
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload
      };
    default: return state;
  }
}

export default rootReducer;