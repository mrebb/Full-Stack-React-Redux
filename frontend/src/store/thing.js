import uuid from 'uuid/v1';
import superagent from 'superagent';
// Actions
export const ADD = 'Thing/ADD';
export const UPDATE = 'Thing/UPDATE';
export const DESTROY = 'Thing/DESTROY';
export const FETCH = 'Thing/FETCH';
// Reducer
export default function reducer(state = [], action) {

  const { type, payload } = action;

  switch (type) {
  case ADD:
    return [
      ...state,
      payload,
    ];
  case DESTROY: {
    let newState = state.filter(thing => thing.id !== payload.id);
    return [
      ...newState,
    ];
  }
  case FETCH:
    return [...payload];
  default: return state;
  }
}

// Action Creators
export function addThing(thing) {
  
  thing.id = uuid();

  return {
    type: ADD,
    payload: thing,
  };  
}
export function removeThing(thing) {
  return {
    type: DESTROY,
    payload: thing,
  };
}
export function fetchThings(things) {
  
  return {
    type: FETCH,
    payload: things,
  };  
}

// export function addThingAsync(thing) {

//   return dispatch => {
//     setTimeout(() => {
//       // Yay! Can invoke sync or async actions with `dispatch`
//       dispatch(addThing(thing));
//     }, 1000);
//   };
// }
export function addThingAsync(thing) {

  return dispatch => {
    return superagent.post('https://internets-of-thing-api.herokuapp.com/api/v1/things')
      .send(thing)
      .then(()=>{
        dispatch(addThing(thing));
        return superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things')
          .then(response=>{
            return response.body;})
          .then((things)=>{
            dispatch(fetchThings(things));
            return things;});
      });
  };  
}
export function fetchThingsAsync() {

  return dispatch => {
    superagent.get('https://internets-of-thing-api.herokuapp.com/api/v1/things')
      .then(response=>{return response.body;})
      .then(things=>dispatch(fetchThings(things)));
  };
}
export function removeThingAsync(thing) {
  return dispatch => {
    return superagent.delete(`https://internets-of-thing-api.herokuapp.com/api/v1/things/${thing.id}`)
      .then(response=>{
        dispatch(removeThing(thing));
        return response.text;
      });
  };
}